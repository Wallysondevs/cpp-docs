# std::locale::id

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
class locale::id;
```

A classe `std::locale::id` fornece identificação específica da implementação de um facet de locale. Cada [facet](<#/doc/locale/locale/facet>) possui um membro estático público chamado `id` do tipo `std::locale::id` e cada objeto [std::locale](<#/doc/locale/locale>) mantém uma lista de facets que ele implementa, indexados pelos seus `id`s.

Facets com o mesmo `id` pertencem à mesma categoria de facet e se substituem quando adicionados a um objeto locale.

### Funções membro

[ (construtor)](<#/doc/locale/locale/id/id>) | constrói um novo id
(função membro pública)
operator= | o operador de atribuição de cópia é deletado
(função membro pública)

### Exemplo

O exemplo a seguir mostra como construir um facet personalizado mínimo.

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    struct myfacet : std::locale::facet
    {
        myfacet(std::size_t refs = 0) : facet(refs) {}
        static ::std::locale::id id;
    };
     
    std::locale::id myfacet::id;
     
    int main()
    {
        std::locale myloc(std::locale(), new myfacet);
        std::cout << "has_facet<myfacet>(myloc) returns " << std::boolalpha
                  << std::has_facet<myfacet>(myloc) << '\n';
    }
```

Saída:
```
    has_facet<myfacet>(myloc) returns true
```

### Veja também

[ facet](<#/doc/locale/locale/facet>) | a classe base para todas as categorias de facet: cada facet de qualquer categoria é derivado deste tipo
(classe)