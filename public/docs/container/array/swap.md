# std::array&lt;T,N&gt;::swap

```cpp
`void swap( array& other ) noexcept(/* see below */);`  // (desde C++11)
(constexpr desde C++20)
```

Troca o conteúdo do container com o de `other`. Não faz com que iterators e referências se associem ao outro container.

### Parameters

- **other** — container para trocar o conteúdo

### Return value

(nenhum)

### Exceptions

```cpp
Especificação `noexcept`: `noexcept(noexcept(swap(std::declval<T&>(), std::declval<T&>())))` Na expressão acima, o identificador `swap` é procurado da mesma maneira que o usado pelo trait `std::is_nothrow_swappable` do C++17.  // (até C++17)
Especificação `noexcept`: `noexcept(std::is_nothrow_swappable_v<T>)`  // (desde C++17)
Para arrays de tamanho zero,
```

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

`noexcept`

### Complexity

Linear no tamanho do container.

### Example

Execute este código
```cpp
    #include <array>
    #include <iostream>
     
    template<class Os, class V> Os& operator<<(Os& os, const V& v)
    {
        os << '{';
        for (auto i : v)
            os << ' ' << i;
        return os << " } ";
    }
     
    int main()
    {
        std::array<int, 3> a1{1, 2, 3}, a2{4, 5, 6};
     
        auto it1 = a1.begin();
        auto it2 = a2.begin();
        int& ref1 = a1[1];
        int& ref2 = a2[1];
     
        std::cout << a1 << a2 << *it1 << ' ' << *it2 << ' ' << ref1 << ' ' << ref2 << '\n';
        a1.swap(a2);
        std::cout << a1 << a2 << *it1 << ' ' << *it2 << ' ' << ref1 << ' ' << ref2 << '\n';
     
        // Note que após a troca, iterators e referências permanecem associados aos seus
        // arrays originais, por exemplo, `it1` ainda aponta para o elemento a1[0], `ref1` ainda se refere a a1[1].
    }
```

Saída:
```
    { 1 2 3 } { 4 5 6 } 1 4 2 5
    { 4 5 6 } { 1 2 3 } 4 1 5 2
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2456](<https://cplusplus.github.io/LWG/issue2456>) | C++11 | a especificação `noexcept` é malformada | feito para funcionar

### See also

[ std::swap(std::array)](<#/doc/container/array/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)