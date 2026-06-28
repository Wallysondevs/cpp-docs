# std::tuple&lt;Types...&gt;::swap

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
void swap( tuple& other ) noexcept(/* see below */);
(constexpr desde C++20)
constexpr void swap( const tuple& other ) noexcept(/* see below */) const;
```

Chama `swap` (que pode ser [std::swap](<#/doc/utility/swap>), ou pode ser encontrado via [ADL](<#/doc/language/adl>)) para cada elemento em *this e seu elemento correspondente em other.

Se qualquer chamada de função `swap` selecionada for malformada, ou não trocar os elementos correspondentes de ambas as tuplas, o comportamento é indefinido. | (até C++23)
---|---
Se qualquer chamada de função `swap` selecionada não trocar os elementos correspondentes de ambas as tuplas, o comportamento é indefinido. 1) O programa é malformado se ([std::is_swappable_v](<#/doc/types/is_swappable>)&lt;Types&gt; && ...) não for verdadeiro. 2) O programa é malformado se ([std::is_swappable_v](<#/doc/types/is_swappable>)&lt;const Types&gt; && ...) não for verdadeiro. | (desde C++23)

### Parâmetros

- **other** — tupla de valores para trocar

### Valor de retorno

(nenhum)

### Exceções

```cpp
especificação `noexcept`: noexcept(
noexcept(swap(std::declval<T0&>>(), std::declval<T0&>())) &&
noexcept(swap(std::declval<T1&>>(), std::declval<T1&>())) &&
noexcept(swap(std::declval<T2&>>(), std::declval<T2&>())) &&
...
) Na expressão acima, o identificador `swap` é procurado da mesma maneira que o usado pelo trait std::is_nothrow_swappable do C++17.  // (até C++17)
```
1) especificação [`noexcept`](<#/doc/language/noexcept_spec>): noexcept(([std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;Types&gt; && ...)) 2) especificação [`noexcept`](<#/doc/language/noexcept_spec>): noexcept(([std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;const Types&gt; && ...)) | (desde C++17)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <tuple>
    
    int main()
    {
        std::tuple<int, std::string, float> p1{42, "ABCD", 2.71}, p2;
        p2 = std::make_tuple(10, "1234", 3.14);
    
        auto print_p1_p2 = &
        {
            std::cout << rem
                      << "p1 = {" << std::get<0>(p1)
                      << ", "     << std::get<1>(p1)
                      << ", "     << std::get<2>(p1) << "}, "
                      << "p2 = {" << std::get<0>(p2)
                      << ", "     << std::get<1>(p2)
                      << ", "     << std::get<2>(p2) << "}\n";
        };
    
        print_p1_p2("Before p1.swap(p2): ");
        p1.swap(p2);
        print_p1_p2("After  p1.swap(p2): ");
        swap(p1, p2);
        print_p1_p2("After swap(p1, p2): ");
    }
```

Saída:
```
    Before p1.swap(p2): p1 = {42, ABCD, 2.71}, p2 = {10, 1234, 3.14}
    After  p1.swap(p2): p1 = {10, 1234, 3.14}, p2 = {42, ABCD, 2.71}
    After swap(p1, p2): p1 = {42, ABCD, 2.71}, p2 = {10, 1234, 3.14}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2456](<https://cplusplus.github.io/LWG/issue2456>) | C++11 | a especificação `noexcept` é malformada | feito para funcionar

### Veja também

[ std::swap(std::tuple)](<#/doc/utility/tuple/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ swap](<#/doc/utility/pair/swap>)(C++11) | troca o conteúdo
(função membro pública de `std::pair<T1,T2>`)