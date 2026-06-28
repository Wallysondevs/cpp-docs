# std::wcscpy

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
wchar_t* wcscpy( wchar_t* dest, const wchar_t* src );
```

Copia a wide string apontada por src (incluindo o caractere nulo largo terminador) para o array de caracteres largos apontado por dest.

Se as strings se sobrepuserem, o comportamento é indefinido.

### Parâmetros

- **dest** — ponteiro para o array de caracteres largos para o qual copiar
- **src** — ponteiro para a wide string terminada em nulo da qual copiar

### Valor de retorno

dest

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <memory>
    
    int main()
    {
        const wchar_t* src = L"犬 means dog";
    //  src[0] = L'狗'; // can't modify string literal
        auto dst = std::make_unique<wchar_t[]>(std::wcslen(src) + 1); // +1 for the null
        std::wcscpy(dst.get(), src);
        dst[0] = L'狗';
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale(""));
        std::wcout << src << '\n' << dst.get() << '\n';
    }
```

Saída:
```
    犬 means dog
    狗 means dog
```

### Veja também

[ wcsncpy](<#/doc/string/wide/wcsncpy>) | copia uma certa quantidade de caracteres largos de uma string para outra
(função)
[ wmemcpy](<#/doc/string/wide/wmemcpy>) | copia uma certa quantidade de caracteres largos entre dois arrays não sobrepostos
(função)
[ strcpy](<#/doc/string/byte/strcpy>) | copia uma string para outra
(função)
[Documentação C](<#/>) para wcscpy