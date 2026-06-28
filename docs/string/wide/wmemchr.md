# std::wmemchr

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
const wchar_t* wmemchr( const wchar_t* ptr, wchar_t ch, std::size_t count );
wchar_t* wmemchr( wchar_t* ptr, wchar_t ch, std::size_t count );
```

Localiza a primeira ocorrência do caractere largo `ch` nos `count` primeiros caracteres largos do array de caracteres largos apontado por `ptr`.

Se `count` for zero, a função retorna um ponteiro nulo.

### Parâmetros

- **ptr** — ponteiro para o array de caracteres largos a ser examinado
- **ch** — caractere largo a ser procurado
- **count** — número de caracteres largos a serem examinados

### Valor de retorno

Ponteiro para a localização do caractere largo, ou um ponteiro nulo se nenhum caractere for encontrado.

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const wchar_t str[] = L"诺不轻信，故人不负我\0诺不轻许，故我不负人。";
        wchar_t target = L'许';
        const std::size_t sz = sizeof str / sizeof *str;
        if (const wchar_t* result = std::wmemchr(str, target, sz))
        {
            std::setlocale(LC_ALL, "en_US.utf8");
            std::wcout.imbue(std::locale("en_US.utf8"));
            std::wcout << "Found '" << target << "' at position " << result - str << '\n';
        }
    }
```

Saída possível:
```
    Found '许' at position 14
```

### Veja também

[ memchr](<#/doc/string/byte/memchr>) | procura em um array pela primeira ocorrência de um caractere
(função)
[ strchr](<#/doc/string/byte/strchr>) | encontra a primeira ocorrência de um caractere
(função)
[ wcschr](<#/doc/string/wide/wcschr>) | encontra a primeira ocorrência de um caractere largo em uma string larga
(função)
[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[documentação C](<#/>) para wmemchr