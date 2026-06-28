# std::fwide

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int fwide( std::FILE* stream, int mode );
```

Se mode > 0, tenta tornar o stream orientado a caracteres largos (wide-oriented). Se mode < 0, tenta tornar o stream orientado a bytes (byte-oriented). Se mode == 0, apenas consulta a orientação atual do stream.

Se a orientação do stream já foi decidida (pela execução de saída ou por uma chamada anterior a fwide), esta função não faz nada.

### Parâmetros

- **stream** — ponteiro para o stream de E/S C a ser modificado ou consultado
- **mode** — valor inteiro maior que zero para definir o stream como wide, menor que zero para definir o stream como narrow, ou zero para apenas consultar

### Valor de retorno

Um inteiro maior que zero se o stream estiver orientado a caracteres largos (wide-oriented) após esta chamada, menor que zero se o stream estiver orientado a bytes (byte-oriented) após esta chamada, e zero se o stream não tiver orientação.

### Exemplo

O código a seguir define e redefine a orientação do stream.

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    #include <cwchar>
    #include <iostream>
     
    void show_orientation(int n)
    {
        n < 0 ? std::wcout << "\tnarrow orientation\n" :
        n > 0 ? std::wcout << "\twide orientation\n" :
                std::wcout << "\tno orientation\n";
    }
     
    void try_read(FILE* fp)
    {
        if (const int c = std::fgetc(fp); c == EOF)
            std::wcout << "\tnarrow character read failed\n";
        else
            std::wcout << "\tnarrow character read '" << static_cast<char>(c) << "'\n";
     
        if (const wint_t wc = std::fgetwc(fp); wc == WEOF)
            std::wcout << "\twide character read failed\n";
        else
            std::wcout << "\twide character read '" << static_cast<wchar_t>(wc) << "'\n";
    }
     
    int main()
    {
        enum fwide_orientation : int { narrow = -1, query, wide };
     
        FILE* fp = std::fopen("main.cpp", "r");
        if (!fp)
        {
            std::wcerr << "fopen() failed\n";
            return EXIT_FAILURE;
        }
     
        std::wcout << "1) A newly opened stream has no orientation.\n";
        show_orientation(std::fwide(fp, fwide_orientation::query));
     
        std::wcout << "2) Establish byte orientation.\n";
        show_orientation(std::fwide(fp, fwide_orientation::narrow));
        try_read(fp);
     
        std::wcout << "3) Only freopen() can reset stream orientation.\n";
        if (std::freopen("main.cpp", "r", fp) == NULL)
        {
            std::wcerr << "freopen() failed\n";
            return EXIT_FAILURE;
        }
     
        std::wcout << "4) A reopened stream has no orientation.\n";
        show_orientation(std::fwide(fp, fwide_orientation::query));
     
        std::wcout << "5) Establish wide orientation.\n";
        show_orientation(std::fwide(fp, fwide_orientation::wide));
        try_read(fp);
     
        std::fclose(fp);
    }
```

Saída possível:
```
    1) A newly opened stream has no orientation.
            no orientation
    2) Establish byte orientation.
            narrow orientation
            narrow character read '#'
            wide character read failed
    3) Only freopen() can reset stream orientation.
    4) A reopened stream has no orientation.
            no orientation
    5) Establish wide orientation.
            wide orientation
            narrow character read failed
            wide character read '#'
```

### Veja também

[ fopen](<#/doc/io/c/fopen>) | abre um arquivo
(função)
[Documentação C](<#/>) para fwide