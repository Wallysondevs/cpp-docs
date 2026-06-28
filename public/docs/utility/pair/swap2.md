# std::swap(std::pair)

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T1, class T2 >
void swap( std::pair<T1,T2>& x, std::pair<T1,T2>& y )
noexcept(/* see below */);
(até C++20)
template< class T1, class T2 >
constexpr void swap( std::pair<T1,T2>& x, std::pair<T1,T2>& y )
noexcept(/* see below */);
template< class T1, class T2 >
constexpr void swap( const std::pair<T1,T2>& x, const std::pair<T1,T2>& y )
noexcept(/* see below */);
```

Troca o conteúdo de `x` e `y`. Equivalente a x.swap(y).

1) Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_swappable_v](<#/doc/types/is_swappable>)<first_type> && [std::is_swappable_v](<#/doc/types/is_swappable>)<second_type>` for verdadeiro. 2) Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_swappable_v](<#/doc/types/is_swappable>)<const first_type> && [std::is_swappable_v](<#/doc/types/is_swappable>)<const second_type>` for verdadeiro. | (desde C++17)

### Parâmetros

- **x, y** — pares cujo conteúdo deve ser trocado

### Valor de retorno

(nenhum)

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(noexcept(x.swap(y)))

### Exemplo

Execute este código
```
    #include <iostream>
    #include <utility>
     
    int main()
    {
        auto p1 = std::make_pair(10, 3.14);
        auto p2 = std::pair(12, 1.23); // CTAD, since C++17
     
        auto print_p1_p2 = & {
            std::cout << msg
                      << "p1 = {" << std::get<0>(p1)
                      << ", "     << std::get<1>(p1) << "}, "
                      << "p2 = {" << std::get<0>(p2)
                      << ", "     << std::get<1>(p2) << "}\n";
        };
     
        print_p1_p2("Before p1.swap(p2): ");
        p1.swap(p2);
        print_p1_p2("After  p1.swap(p2): ");
        std::swap(p1, p2);
        print_p1_p2("After swap(p1, p2): ");
    }
```

Saída:
```
    Before p1.swap(p2): p1 = {10, 3.14}, p2 = {12, 1.23}
    After  p1.swap(p2): p1 = {12, 1.23}, p2 = {10, 3.14}
    After swap(p1, p2): p1 = {10, 3.14}, p2 = {12, 1.23}
```

### Veja também

[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)
[ std::swap(std::tuple)](<#/doc/utility/tuple/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)