# std::ferror

Definido no header `[<cstdio>](<#/doc/header/cstdio>)`

```cpp
int ferror( std::FILE* stream );
```

Verifica o stream fornecido em busca de erros.

### Parâmetros

- **stream** — o stream de arquivo a ser verificado

### Valor de retorno

Valor diferente de zero se o stream de arquivo tiver ocorrido erros, ​0​ caso contrário.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstdio>
    #include <cstdlib>
    #include <cwchar>
    
    int main()
    {
        const char *fname = std::tmpnam(nullptr);
        std::FILE* f = std::fopen(fname, "wb");
        std::fputs("\xff\xff\n", f); // not a valid UTF-8 character sequence
        std::fclose(f);
    
        std::setlocale(LC_ALL, "en_US.utf8");
        f = std::fopen(fname, "rb");
        std::wint_t ch;
        while ((ch=std::fgetwc(f)) != WEOF) // attempt to read as UTF-8
            std::printf("%#x ", ch);
    
        if (std::feof(f))
            puts("EOF indicator set");
        if (std::ferror(f))
            puts("Error indicator set");
    }
```

Saída:
```
    Error indicator set
```

### Veja também

[ clearerr](<#/doc/io/c/clearerr>) | limpa erros
(função)
[ feof](<#/doc/io/c/feof>) | verifica o fim do arquivo
(função)
[ fail](<#/doc/io/basic_ios/fail>) | verifica se um erro ocorreu
(função membro pública de `std::basic_ios<CharT,Traits>`)
[Documentação C](<#/>) para ferror