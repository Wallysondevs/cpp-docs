# std::ranges::empty

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /*unspecified*/ {
inline constexpr auto empty = /*unspecified*/;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr bool empty( T&& t );
```

Determina se `t` possui ou não quaisquer elementos.

Uma chamada para `ranges::empty` é [equivalente em expressão](<#/doc/language/expressions>) a:

  1. bool(t.empty()), se essa expressão for válida.
  2. Caso contrário, ([ranges::size](<#/doc/ranges/size>)(t) == 0), se essa expressão for válida.
  3. Caso contrário, bool([ranges::begin](<#/doc/ranges/begin>)(t) == [ranges::end](<#/doc/ranges/end>)(t)), se essa expressão for válida e decltype([ranges::begin](<#/doc/ranges/begin>)(t)) modelar [std::forward_iterator](<#/doc/iterator/forward_iterator>).

Em todos os outros casos, uma chamada para `ranges::empty` é malformada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando ranges::empty(t) aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `ranges::empty` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___empty_fn_`.

Todas as instâncias de `___empty_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___empty_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como `const` ou não (no entanto, uma instância qualificada como `volatile` não é exigida para ser invocável). Assim, `ranges::empty` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `ranges::empty` acima, `___empty_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__empty_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __empty_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__empty_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __empty_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___empty_fn_` participa da resolução de sobrecarga.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    #include <vector>
    
    template<std::ranges::input_range R>
    void print(char id, R&& r)
    {
        if (std::ranges::empty(r))
        {
            std::cout << '\t' << id << ") Empty\n";
            return;
        }
    
        std::cout << '\t' << id << ") Elements:";
        for (const auto& element : r)
            std::cout << ' ' << element;
        std::cout << '\n';
    }
    
    int main()
    {
        {
            auto v = std::vector<int>{1, 2, 3};
            std::cout << "(1) ranges::empty uses std::vector::empty:\n";
            print('a', v);
    
            v.clear();
            print('b', v);
        }
        {
            std::cout << "(2) ranges::empty uses ranges::size(initializer_list):\n";
            auto il = {7, 8, 9};
            print('a', il);
    
            print('b', std::initializer_list<int>{});
        }
        {
            std::cout << "(2) ranges::empty on a raw array uses ranges::size:\n";
            int array[] = {4, 5, 6}; // array has a known bound
            print('a', array);
        }
        {
            struct Scanty : private std::vector<int>
            {
                using std::vector<int>::begin;
                using std::vector<int>::end;
                using std::vector<int>::push_back;
                // Note: both empty() and size() are hidden
            };
    
            std::cout << "(3) calling ranges::empty on an object w/o empty() or size():\n";
            Scanty y;
            print('a', y);
            y.push_back(42);
            print('b', y);
        }
    }
```

Saída:
```
    (1) ranges::empty uses std::vector::empty:
            a) Empty
            b) Elements: 1 2 3
    (2) ranges::empty uses ranges::size(initializer_list):
            a) Elements: 7 8 9
            b) Empty
    (2) ranges::empty on a raw array uses ranges::size:
            a) Elements: 4 5 6
    (3) calling ranges::empty on an object w/o empty() or size():
            a) Empty
            b) Elements: 42
```

### Veja também

[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio
(modelo de função)