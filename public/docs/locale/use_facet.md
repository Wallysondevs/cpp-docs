# std::use_facet

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class Facet >
const Facet& use_facet( const std::locale& loc );
```

Obtém uma referência para um facet implementado por loc.

O programa é malformado se Facet não for um [facet](<#/doc/locale/locale/facet>) cuja definição contém o membro estático público `id` ou se for um facet qualificado como volatile.

### Parâmetros

- **loc** — o objeto locale a ser consultado

### Valor de retorno

Retorna uma referência para o facet. A referência retornada por esta função é válida enquanto qualquer objeto [std::locale](<#/doc/locale/locale>) se referir a esse facet.

### Exceções

[std::bad_cast](<#/doc/types/bad_cast>) se [std::has_facet](<#/doc/locale/has_facet>)&lt;Facet&gt;(loc) == false.

### Observações

Um objeto [std::locale](<#/doc/locale/locale>) não deve ser temporário se uma referência ao objeto `Facet` obtido de `use_facet` for usada após o fim da instrução:
```cpp
    // RUIM:
    auto& f = std::use_facet<std::moneypunct<char, true>>(std::locale{"no_NO.UTF-8"});
    foo(f.curr_symbol()); // Erro: f usa internamente uma referência pendente
                          // para um objeto std::locale que não existe mais.
    // BOM:
    auto loc = std::locale{"is_IS.UTF-8"}; // OK: um objeto não temporário
    auto& f = std::use_facet<std::moneypunct<char, true>>(loc);
    foo(f.curr_symbol()); // OK: f usa internamente uma referência para um objeto locale existente.
```

### Exemplo

Exibe o nome da moeda de 3 letras usado pelo locale preferido do usuário.

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    int main()
    {
        for (const char* name: {"en_US.UTF-8", "de_DE.UTF-8", "en_GB.UTF-8"})
            std::cout << "Your currency string is "
                      << std::use_facet<std::moneypunct<char, true>>(std::locale{name}).
                         curr_symbol() << '\n';
    }
```

Saída:
```
    Your currency string is USD
    Your currency string is EUR
    Your currency string is GBP
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 31](<https://cplusplus.github.io/LWG/issue31>) | C++98 | a referência retornada permanecia utilizável
enquanto o próprio valor do locale existisse | a referência retornada permanece utilizável enquanto
algum objeto locale se referir a esse facet
[LWG 38](<https://cplusplus.github.io/LWG/issue38>) | C++98 | `Facet` não era obrigado a ter um membro direto `id` | exigido
---|---|---|---
[LWG 436](<https://cplusplus.github.io/LWG/issue436>) | C++98 | não estava claro se `Facet` poderia ser cv-qualificado | pode ser const-qualificado, mas não volatile-qualificado

### Veja também

[ locale](<#/doc/locale/locale>) | conjunto de facets polimórficos que encapsulam diferenças culturais
(classe)
[ has_facet](<#/doc/locale/has_facet>) | verifica se um locale implementa um facet específico
(modelo de função)