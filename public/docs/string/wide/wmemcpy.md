# std::wmemcpy

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
wchar_t* wmemcpy( wchar_t* dest, const wchar_t* src, std::size_t count );
```

Copia exatamente `count` caracteres largos sucessivos do array de caracteres largos apontado por `src` para o array de caracteres largos apontado por `dest`. Se os objetos se sobrepuserem, o comportamento é indefinido. Se `count` for zero, a função não faz nada.

### Parâmetros

- **dest** — ponteiro para o array de caracteres largos para o qual copiar
- **src** — ponteiro para o array de caracteres largos do qual copiar
- **count** — número de caracteres largos a copiar

### Valor de retorno

dest

### Observações

O análogo desta função para strings de byte é [std::strncpy](<#/doc/string/byte/strncpy>), não [std::strcpy](<#/doc/string/byte/strcpy>).

Esta função não é sensível à localidade (locale-sensitive) e não presta atenção aos valores dos objetos `wchar_t` que copia: nulos, assim como caracteres inválidos, também são copiados.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <iterator>
    #include <locale>
    
    int main(void)
    {
        const wchar_t from1[] = L"नमस्ते";
        const wchar_t from2[] = L"Բարև";
        const std::size_t sz1 = std::size(from1);
        const std::size_t sz2 = std::size(from2);
        wchar_t to[sz1 + sz2];
    
        std::wmemcpy(to, from1, sz1); // copy from1, along with its null terminator
        std::wmemcpy(to + sz1, from2, sz2); // append from2, along with its null terminator
    
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
        std::wcout << L"Wide array contains: ";
        for (std::size_t n = 0; n < std::size(to); ++n)
            if (to[n])
                std::wcout << to[n];
            else
                std::wcout << L"\\0";
        std::wcout << L'\n';
    }
```

Saída possível:
```
    Wide array contains: नमस्ते\0Բարև\0
```

### Veja também

[ strncpy](<#/doc/string/byte/strncpy>) | copia uma certa quantidade de caracteres de uma string para outra
(função)
[ wmemmove](<#/doc/string/wide/wmemmove>) | copia uma certa quantidade de caracteres largos entre dois arrays, possivelmente sobrepostos
(função)
[Documentação C](<#/>) para wmemcpy