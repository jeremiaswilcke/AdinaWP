import Image from 'next/image';

export default function FixedBackground() {
    return (
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] -z-10 pointer-events-none opacity-0 md:opacity-20 mix-blend-multiply -translate-x-1/4 -translate-y-[10%]">
            <Image
                src="/images/bg-sketch.png"
                alt="Adina Wilcke Sketch"
                fill
                className="object-contain object-bottom-left"
                priority
            />
        </div>
    );
}
