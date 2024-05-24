import { CreateUserForm } from "@/features/create-user/create-user-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";

export default function Users() {
  return (
    <div className="p-4">
      <Card className="w-[500px] mb-4">
        <CardHeader>
          <CardTitle>Создать пользователя</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CreateUserForm />
        </CardContent>
      </Card>
    </div>
  );
}
