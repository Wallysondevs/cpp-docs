# std::has_facet

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class Facet >
bool has_facet( const locale& loc ) throw();
template< class Facet >
bool has_facet( const locale& loc ) noexcept;
```

Verifica se o locale `loc` implementa o facet `Facet`.

O programa é malformado se `Facet` não for um [facet](<#/doc/locale/locale/facet>) ou se for um facet qualificado como volatile.

### Parâmetros

- **loc** — o objeto locale a ser consultado

### Valor de retorno

Retorna `true` se o facet `Facet` foi instalado no locale `loc`, `false` caso contrário.

### Observações

`std::has_facet` deve retornar `true` para todos os locales `loc` se `Facet` for um dos facets padrão fornecidos [aqui](<#/doc/locale/locale>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    // minimal custom facet
    struct myfacet : public std::locale::facet
    {
        static std::locale::id id;
    };
    
    std::locale::id myfacet::id;
    
    int main()
    {
        // loc is a "C" locale with myfacet added
        std::locale loc(std::locale::classic(), new myfacet);
        std::cout << std::boolalpha
                  << "Can loc classify chars? "
                  << std::has_facet<std::ctype<char>>(loc) << '\n'
                  << "Can loc classify char32_t? "
                  << std::has_facet<std::ctype<char32_t>>(loc) << '\n'
                  << "Does loc implement myfacet? "
                  << std::has_facet<myfacet>(loc) << '\n';
    }
```

Saída:
```
    Can loc classify chars? true
    Can loc classify char32_t? false
    Does loc implement myfacet? true
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 436](<https://cplusplus.github.io/LWG/issue436>) | C++98 | não estava claro se `Facet` pode ser cv-qualificado | pode ser const-qualificado, mas não volatile-qualificado

### Veja também

[ locale](<#/doc/locale/locale>) | conjunto de facets polimórficos que encapsulam diferenças culturais
(classe)
[ use_facet](<#/doc/locale/use_facet>) | obtém um facet de um locale
(modelo de função)