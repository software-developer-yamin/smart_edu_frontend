'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  Mail,
  MapPin,
  User,
  Users,
  BookOpen,
  Hash,
  Shield,
  Clock
} from 'lucide-react';
import { useGetSingleUserWithFeeQuery } from '@/services/user/user.api';
import { getCookie } from 'cookies-next';
import { UserStatus } from '@/services/user/user.types';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useCreatePaymentMutation } from '@/services/payment/payment.api';

export default function InfoCard() {
  const { data: result, isLoading } = useGetSingleUserWithFeeQuery({
    id: getCookie('userId') as string
  });

  const [createPayment] = useCreatePaymentMutation();

  const handlePayment = async () => {
    await createPayment({
      userId: result?.user.id,
      feeId: result?.fee.id,
      amount: result?.fee.totalAmount
    })
      .unwrap()
      .then((result) => {
        toast.success(`Payment has been successfully created!`);
        if (typeof window !== 'undefined') {
          window.open(result.gatewayPageURL);
        }
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!result) return <div>Data Not Found</div>;

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{result.user?.name}</span>
          <Badge
            variant={
              result.user?.status === UserStatus.ACTIVE
                ? 'default'
                : 'secondary'
            }
            className="rounded-full"
          >
            {result.user?.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Roll Number:</span>
              <span>{result.user.rollNumber}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Class:</span>
              <span>
                {result.user.class} - {result.user.section}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Phone:</span>
              <span>{result.user.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{result.user.email}</span>
              {result.user.isEmailVerified && (
                <Badge variant="outline" className="ml-2">
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Role:</span>
              <span>{result.user.role}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Address:</span>
              <span>{result.user.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Created:</span>
              <span>
                {new Date(result.user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Updated:</span>
              <span>
                {new Date(result.user.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="mb-2 flex items-center font-semibold">
            <Users className="mr-2 h-5 w-5" />
            Guardian Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Name:</span>
              <span>{result.user.guardian.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Relation:</span>
              <span>{result.user.guardian.relation}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Phone:</span>
              <span>{result.user.guardian.phoneNumber}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <span>Amount: {result.fee.totalAmount}</span>
          <Button onClick={handlePayment}>Pay Now</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
