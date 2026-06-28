# std::default_initializable

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept default_initializable = std::constructible_from<T> && requires { T{}; } &&
/* T t; is well-formed, see below */;
```

O concept `default_initializable` verifica se variáveis do tipo `T` podem ser

*   [inicializadas por valor](<#/doc/language/value_initialization>) (isto é, se T() é bem-formado);
*   [inicializadas por lista direta](<#/doc/language/list_initialization>) a partir de uma lista de inicializadores vazia (isto é, se T{} é bem-formado); e
*   [inicializadas por padrão](<#/doc/language/default_initialization>) (isto é, se T t; é bem-formado).

A verificação de acesso é realizada como se estivesse em um contexto não relacionado a T. Apenas a validade do contexto imediato da inicialização da variável é considerada.

### Possível implementação
```cpp
    template<class T>
    concept default_initializable =
        std::constructible_from<T> &&
        requires { T{}; ::new T; };
```

---

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   18.4.12 Concept `default_initializable` [concept.default.init]

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   18.4.12 Concept `default_initializable` [concept.default.init]

### Veja também

[ constructible_from](<#/doc/concepts/constructible_from>)(desde C++20) | especifica que uma variável do tipo pode ser construída a partir de ou ligada a um conjunto de tipos de argumento
(concept)
[ is_default_constructibleis_trivially_default_constructibleis_nothrow_default_constructible](<#/doc/types/is_default_constructible>)(desde C++11)(desde C++11)(desde C++11) | verifica se um tipo possui um construtor padrão
(class template)
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão