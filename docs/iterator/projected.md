# std::projected

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< std::indirectly_readable I,
std::indirectly_regular_unary_invocable<I> Proj >
struct projected
{
using value_type = std::remove_cvref_t<std::indirect_result_t<Proj&, I>>;
std::indirect_result_t<Proj&, I> operator*() const; // não definido
};
(até C++26)
template< std::indirectly_readable I,
std::indirectly_regular_unary_invocable<I> Proj >
using projected = /*projected-impl*/<I, Proj>::/*__type*/; // veja (3)
template< std::weakly_incrementable I, class Proj >
struct incrementable_traits<std::projected<I, Proj>>
{
using difference_type = std::iter_difference_t<I>;
};
(até C++26)
template< class I, class Proj >
struct /*projected-impl*/
{
struct /*__type*/
{
using value_type = std::remove_cvref_t<std::indirect_result_t<Proj&, I>>;
using difference_type = std::iter_difference_t<I>; // presente condicionalmente
```

```cpp
std::indirect_result_t<Proj&, I> operator*() const; // não definido
};
};  // (3) (desde C++26)
(apenas para exposição*)
```

1) O template de classe (até C++26) / alias (desde C++26) `projected` combina um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) `I` e um tipo de objeto invocável `Proj` em um novo tipo `indirectly_readable` cujo tipo de referência é o resultado da aplicação de `Proj` a [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;.

2) Esta especialização de [std::incrementable_traits](<#/doc/iterator/incrementable_traits>) torna std::[projected](<#/doc/iterator/projected>)<I, Proj> um tipo [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>) quando `I` também é um tipo `weakly_incrementable`.

3) Uma camada indireta usada para evitar [argument-dependent lookup](<#/doc/language/adl>) inesperado. O tipo membro `difference_type` existe apenas se `I` modela [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>).

`projected` é usado apenas para restringir algoritmos que aceitam objetos invocáveis e projeções, e, portanto, seu operator*() não é definido.

### Parâmetros de template

- **I** — um tipo indiretamente legível
- **Proj** — projeção aplicada a um `I` desreferenciado

### Notas

A camada indireta impede que `I` e `Proj` sejam classes associadas de `projected`. Quando uma classe associada de `I` ou `Proj` é um tipo de classe incompleto, a camada indireta evita a tentativa desnecessária de inspecionar a definição desse tipo, o que resultaria em um erro grave.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <functional>
    #include <iterator>
    
    template<class T>
    struct Holder
    {
        T t;
    };
    
    struct Incomplete;
    
    using P = Holder<Incomplete>*;
    
    static_assert(std::equality_comparable<P>); // OK
    static_assert(std::indirectly_comparable<P*, P*, std::equal_to<>>); // Erro antes de C++26
    static_assert(std::sortable<P*>); // Erro antes de C++26
    
    int main()
    {
        P a[10] = {}; // ten null pointers
        assert(std::count(a, a + 10, nullptr) == 10); // OK
        assert(std::ranges::count(a, a + 10, nullptr) == 10); // Erro antes de C++26
    }
```

### Veja também

[projected_value_t](<#/doc/iterator/projected_value_t>)(C++26) | calcula o tipo de valor de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) por projeção
(template de alias)