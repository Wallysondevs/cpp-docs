# std::wmemcmp

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int wmemcmp( const wchar_t* lhs, const wchar_t* rhs, std::size_t count );
```

Compara os primeiros `count` caracteres largos dos arrays de caracteres largos apontados por `lhs` e `rhs`. A comparação é feita lexicograficamente.

O sinal do resultado é o sinal da diferença entre os valores do primeiro par de caracteres largos que diferem nos arrays sendo comparados.

Se `count` for zero, a função não faz nada.

### Parâmetros

- **lhs, rhs** — ponteiros para os arrays de caracteres largos a serem comparados
- **count** — número de caracteres largos a serem examinados

### Valor de retorno

Valor negativo se o valor do primeiro caractere largo diferente em `lhs` for menor que o valor do caractere largo correspondente em `rhs`: `lhs` precede `rhs` na ordem lexicográfica.

​0​ se todos os `count` caracteres largos de `lhs` e `rhs` forem iguais.

Valor positivo se o valor do primeiro caractere largo diferente em `lhs` for maior que o valor do caractere largo correspondente em `rhs`: `rhs` precede `lhs` na ordem lexicográfica.

### Notas

Esta função não é sensível à localidade e não presta atenção aos valores dos objetos `wchar_t` que examina: nulos, bem como caracteres largos inválidos, também são comparados.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <locale>
    #include <string>
    
    void demo(const wchar_t* lhs, const wchar_t* rhs, std::size_t sz)
    {
        std::wcout << std::wstring(lhs, sz);
        int rc = std::wmemcmp(lhs, rhs, sz);
        if (rc == 0)
            std::wcout << " compares equal to ";
        else if (rc < 0)
            std::wcout << " precedes ";
        else if (rc > 0)
            std::wcout << " follows ";
        std::wcout << std::wstring(rhs, sz) << " in lexicographical order\n";
    }
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
    
        wchar_t a1[] = {L'α',L'β',L'γ'};
        constexpr std::size_t sz = sizeof a1 / sizeof *a1;
        wchar_t a2[sz] = {L'α',L'β',L'δ'};
    
        demo(a1, a2, sz);
        demo(a2, a1, sz);
        demo(a1, a1, sz);
    }
```

Saída possível:
```
    αβγ precedes αβδ in lexicographical order
    αβδ follows αβγ in lexicographical order
    αβγ compares equal to αβγ in lexicographical order
```

### Veja também

[ wcscmp](<#/doc/string/wide/wcscmp>) | compara duas strings largas
(função)
[ memcmp](<#/doc/string/byte/memcmp>) | compara dois buffers
(função)
[ wcsncmp](<#/doc/string/wide/wcsncmp>) | compara uma certa quantidade de caracteres de duas strings largas
(função)
[Documentação C](<#/>) para wmemcmp