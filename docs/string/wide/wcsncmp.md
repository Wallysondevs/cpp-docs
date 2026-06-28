# std::wcsncmp

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int wcsncmp( const wchar_t* lhs, const wchar_t* rhs, std::size_t count );
```

Compara no máximo `count` caracteres largos de duas strings largas terminadas em nulo. A comparação é feita lexicograficamente.

O sinal do resultado é o sinal da diferença entre os valores do primeiro par de caracteres largos que diferem nas strings sendo comparadas.

O comportamento é indefinido se `lhs` ou `rhs` não forem ponteiros para strings terminadas em nulo.

### Parâmetros

- **lhs, rhs** — ponteiros para as strings largas terminadas em nulo a serem comparadas
- **count** — número máximo de caracteres a serem comparados

### Valor de retorno

Valor negativo se `lhs` aparecer antes de `rhs` na ordem lexicográfica.

Zero se `lhs` e `rhs` forem iguais na comparação.

Valor positivo se `lhs` aparecer depois de `rhs` na ordem lexicográfica.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <locale>
     
    void demo(const wchar_t* lhs, const wchar_t* rhs, int sz)
    {
        int rc = std::wcsncmp(lhs, rhs, sz);
        if (rc == 0)
            std::wcout << "First " << sz << " characters of ["
                       << lhs << "] equal [" << rhs << "]\n";
        else if (rc < 0)
            std::wcout << "First " << sz << " characters of ["
                       << lhs << "] precede [" << rhs << "]\n";
        else if (rc > 0)
            std::wcout << "First " << sz << " characters of ["
                       << lhs << "] follow [" << rhs << "]\n";
    }
     
    int main()
    {
        const wchar_t str1[] = L"안녕하세요";
        const wchar_t str2[] = L"안녕히 가십시오";
     
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
        demo(str1, str2, 5);
        demo(str2, str1, 8);
        demo(str1, str2, 2);
    }
```

Saída:
```
    First 5 characters of [안녕하세요] precede [안녕히 가십시오]
    First 8 characters of [안녕히 가십시오] follow [안녕하세요]
    First 2 characters of [안녕하세요] equal [안녕히 가십시오]
```

### Veja também

[ strncmp](<#/doc/string/byte/strncmp>) | compara um certo número de caracteres de duas strings
(função)
[ wcscmp](<#/doc/string/wide/wcscmp>) | compara duas strings largas
(função)
[ wmemcmp](<#/doc/string/wide/wmemcmp>) | compara uma certa quantidade de caracteres largos de dois arrays
(função)
[ wcscoll](<#/doc/string/wide/wcscoll>) | compara duas strings largas de acordo com a locale atual
(função)
[Documentação C](<#/>) para wcsncmp