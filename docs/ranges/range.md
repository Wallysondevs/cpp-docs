# std::ranges::range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class T >
concept range = requires( T& t ) {
ranges::begin(t); // equality-preserving for forward iterators
ranges::end (t);
};
```

O concept `range` define os requisitos de um tipo que permite a iteração sobre seus elementos, fornecendo um iterator e um sentinel que denotam os elementos do range.

### Requisitos semânticos

Dada uma expressão E tal que decltype((E)) é `T`, `T` modela `range` somente se

*   `[`[ranges::begin](<#/doc/ranges/begin>)(E)`, `[ranges::end](<#/doc/ranges/end>)(E)`)` denota um [range](<#/doc/iterator>), e
*   ambos [ranges::begin](<#/doc/ranges/begin>)(E) e [ranges::end](<#/doc/ranges/end>)(E) são de tempo constante amortizado e não alteram o valor de E de uma maneira observável para expressões [equality-preserving](<#/doc/concepts>), e
*   se o tipo de [ranges::begin](<#/doc/ranges/begin>)(E) modela [`forward_iterator`](<#/doc/iterator/forward_iterator>), [ranges::begin](<#/doc/ranges/begin>)(E) é [equality-preserving](<#/doc/concepts>) (em outras palavras, forward iterators suportam algoritmos de múltiplas passagens).

### Notas

Uma classe `range` típica precisa apenas fornecer duas funções:

1.  Uma função membro `begin()` cujo tipo de retorno modela [`input_or_output_iterator`](<#/doc/iterator/input_or_output_iterator>).
2.  Uma função membro `end()` cujo tipo de retorno modela [`sentinel_for`](<#/doc/iterator/sentinel_for>)`<It>`, onde `It` é o tipo de retorno de `begin()`.

Alternativamente, elas podem ser funções não-membro, a serem encontradas por [argument-dependent lookup](<#/doc/language/adl>).

### Exemplo

Execute este código
```cpp
    #include <ranges>
    
    // A minimum range
    struct SimpleRange
    {
        int* begin();
        int* end();
    };
    static_assert(std::ranges::range<SimpleRange>);
    
    // Not a range: no begin/end
    struct NotRange
    {
        int t {};
    };
    static_assert(!std::ranges::range<NotRange>);
    
    // Not a range: begin does not return an input_or_output_iterator
    struct NotRange2
    {
        void* begin();
        int* end();
    };
    static_assert(!std::ranges::range<NotRange2>);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 3915](<https://cplusplus.github.io/LWG/issue3915>) | C++20 | [ranges::begin](<#/doc/ranges/begin>)(t) e [ranges::end](<#/doc/ranges/end>)(t)
não exigia variações de expressão implícitas | removeu a
descrição redundante