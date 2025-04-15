<?php

namespace App\Filament\Tables\Columns;

use Filament\Tables\Columns\Column;
use Illuminate\Contracts\View\View;

class ImageTitleDescriptionColumn extends Column
{
    protected string $view = 'vendor.tables.components.image-title-description';

    protected string | \Closure | null $imagePath = null;
    protected string | \Closure | null $description = null;
    protected string $imageSize = 'h-5 w-5';

    public function imagePath(string | \Closure | null $path): static
    {
        $this->imagePath = $path;

        return $this;
    }

    public function description(string | \Closure | null $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function imageSize(string $size): static
    {
        $this->imageSize = $size;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->evaluate($this->imagePath);
    }

    public function getDescription(): ?string
    {
        return $this->evaluate($this->description);
    }

    public function getImageSize(): string
    {
        return $this->imageSize;
    }
};
