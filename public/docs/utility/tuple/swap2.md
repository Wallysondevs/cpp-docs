# std::swap(std::tuple)

```cpp
Definido no header `<tuple>`
  // (1)
template< class... Types >
void swap( std::tuple<Types...>& lhs,
std::tuple<Types...>& rhs ) noexcept(/* veja abaixo */);  // (desde C++11)
(ate C++20)
template< class... Types >
constexpr void swap( std::tuple<Types...>& lhs,
std::tuple<Types...>& rhs ) noexcept(/* veja abaixo */);  // (desde C++20)
template< class... Types >
constexpr void swap( const std::tuple<Types...>& lhs,
const std::tuple<Types...>& rhs ) noexcept(/* veja abaixo */);  // (2) (desde C++23)
```

Troca o conteúdo de lhs e rhs. Equivalente a lhs.swap(rhs).

1) Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;Ti&gt; for true para todo i de 0 a sizeof...(Types). 2) Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;const Ti&gt; for true para todo i de 0 a sizeof...(Types). | (desde C++17)

### Parâmetros

- **lhs, rhs** — tuples cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Exceções

Especificação `noexcept`:

noexcept(noexcept(lhs.swap(rhs)))

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

### Veja também

[ swap](<#/doc/utility/tuple/swap>) | troca o conteúdo de duas `tuple`s
(função membro pública)
[ std::swap(std::pair)](<#/doc/utility/pair/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)