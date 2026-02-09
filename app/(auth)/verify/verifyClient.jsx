import { Suspense } from "react";
import Verify from "./page";

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Verify />
        </Suspense>
    );
}
