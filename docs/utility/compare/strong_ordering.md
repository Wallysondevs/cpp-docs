# std::strong_ordering

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
class strong_ordering;
```

  
O tipo de classe `std::strong_ordering` é o tipo de resultado de uma [comparação de três vias](<#/doc/language/operator_comparison>) que: 

  * Admite todos os seis operadores relacionais (`==`, `!=`, `<`, `<=`, `>`, `>=`). 

  * Implica substituibilidade: se a é equivalente a b, f(a) também é equivalente a f(b), onde f denota uma função que lê apenas o estado saliente para comparação que é acessível através dos membros `public const` do argumento. Em outras palavras, valores equivalentes são indistinguíveis. 
  * [Não permite valores incomparáveis](<https://en.wikipedia.org/wiki/Connected_relation> "enwiki:Connected relation"): exatamente um de a < b, a == b, ou a > b deve ser verdadeiro. 

### Constantes

O tipo `std::strong_ordering` possui quatro valores válidos, implementados como membros de dados `const static` de seu tipo: 

Nome  |  Definição   
---|---
inline constexpr std::strong_ordering less[static] |  um valor válido indicando uma relação de "menor que" (ordenado antes)   
(constante membro estática pública)  
inline constexpr std::strong_ordering equivalent[static] |  um valor válido indicando equivalência (nem ordenado antes nem ordenado depois), o mesmo que `equal`   
(constante membro estática pública)  
inline constexpr std::strong_ordering equal[static] |  um valor válido indicando equivalência (nem ordenado antes nem ordenado depois), o mesmo que `equivalent`   
(constante membro estática pública)  
inline constexpr std::strong_ordering greater[static] |  um valor válido indicando uma relação de "maior que" (ordenado depois)   
(constante membro estática pública)  
  
### Conversões

`std::strong_ordering` é a mais forte das três categorias de comparação: não é implicitamente conversível de nenhuma outra categoria e é implicitamente conversível para as outras duas. 

** operator partial_ordering** |  conversão implícita para std::partial_ordering   
(função membro pública)  
  
##  std::strong_ordering::operator partial_ordering

constexpr operator partial_ordering() const noexcept;

  
###  Valor de retorno

std::partial_ordering::less se `v` for `less`, std::partial_ordering::greater se `v` for `greater`, std::partial_ordering::equivalent se `v` for `equal` ou `equivalent`. 

** operator weak_ordering** |  conversão implícita para std::weak_ordering   
(função membro pública)  
  
##  std::strong_ordering::operator weak_ordering

constexpr operator weak_ordering() const noexcept;

  
###  Valor de retorno

std::weak_ordering::less se `v` for `less`, std::weak_ordering::greater se `v` for `greater`, std::weak_ordering::equivalent se `v` for `equal` ou `equivalent`. 

### Comparações

Operadores de comparação são definidos entre valores deste tipo e o literal ​0​. Isso suporta as expressões a <=> b == 0 ou a <=> b < 0 que podem ser usadas para converter o resultado de um operador de comparação de três vias em uma relação booleana; veja [`std::is_eq`](<#/doc/utility/compare/named_comparison_functions>), [`std::is_lt`](<#/doc/utility/compare/named_comparison_functions>), etc. 

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::strong_ordering` é uma classe associada dos argumentos. 

O comportamento de um programa que tenta comparar um `strong_ordering` com qualquer coisa diferente do literal inteiro ​0​ é indefinido. 

** operator==operator&lt;operator&gt;operator<=operator>=operator<=>** |  compara com zero ou um `strong_ordering`   
(função)  
  
##  operator==

```cpp
friend constexpr bool
operator==( strong_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool
operator==( strong_ordering v, strong_ordering w ) noexcept = default;  // (2)
```

  
###  Parâmetros

v, w  |  \-  |  valores `std::strong_ordering` para verificar   
---|---|---
u  |  \-  |  um parâmetro não utilizado de qualquer tipo que aceite um argumento literal zero   
  
###  Valor de retorno

1) true se `v` for `equivalent` ou `equal`, false se `v` for `less` ou `greater`

2) true se ambos os parâmetros contiverem o mesmo valor, false caso contrário. Note que `equal` é o mesmo que `equivalent`. 

##  operator<

```cpp
friend constexpr bool operator<( strong_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator<( /*unspecified*/ u, strong_ordering v ) noexcept;  // (2)
```

  
###  Parâmetros

v  |  \-  |  um valor `std::strong_ordering` para verificar   
---|---|---
u  |  \-  |  um parâmetro não utilizado de qualquer tipo que aceite um argumento literal zero   
  
###  Valor de retorno

1) true se `v` for `less`, e false se `v` for `greater`, `equivalent`, ou `equal`

2) true se `v` for `greater`, e false se `v` for `less`, `equivalent`, ou `equal`

##  operator<=

```cpp
friend constexpr bool operator<=( strong_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator<=( /*unspecified*/ u, strong_ordering v ) noexcept;  // (2)
```

  
###  Parâmetros

v  |  \-  |  um valor `std::strong_ordering` para verificar   
---|---|---
u  |  \-  |  um parâmetro não utilizado de qualquer tipo que aceite um argumento literal zero   
  
###  Valor de retorno

1) true se `v` for `less`, `equivalent`, ou `equal`, e false se `v` for `greater`

2) true se `v` for `greater`, `equivalent`, ou `equal`, e false se `v` for `less`

##  operator>

```cpp
friend constexpr bool operator>( strong_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator>( /*unspecified*/ u, strong_ordering v ) noexcept;  // (2)
```

  
###  Parâmetros

v  |  \-  |  um valor `std::strong_ordering` para verificar   
---|---|---
u  |  \-  |  um parâmetro não utilizado de qualquer tipo que aceite um argumento literal zero   
  
###  Valor de retorno

1) true se `v` for `greater`, e false se `v` for `less`, `equivalent`, ou `equal`

2) true se `v` for `less`, e false se `v` for `greater`, `equivalent`, ou `equal`

##  operator>=

```cpp
friend constexpr bool operator>=( strong_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator>=( /*unspecified*/ u, strong_ordering v ) noexcept;  // (2)
```

  
###  Parâmetros

v  |  \-  |  um valor `std::strong_ordering` para verificar   
---|---|---
u  |  \-  |  um parâmetro não utilizado de qualquer tipo que aceite um argumento literal zero   
  
###  Valor de retorno

1) true se `v` for `greater`, `equivalent`, ou `equal`, e false se `v` for `less`

2) true se `v` for `less`, `equivalent`, ou `equal`, e false se `v` for `greater`

##  operator<=>

```cpp
friend constexpr strong_ordering
operator<=>( strong_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr strong_ordering
operator<=>( /*unspecified*/ u, strong_ordering v ) noexcept;  // (2)
```

  
###  Parâmetros

v  |  \-  |  um valor `std::strong_ordering` para verificar   
---|---|---
u  |  \-  |  um parâmetro não utilizado de qualquer tipo que aceite um argumento literal zero   
  
###  Valor de retorno

1) v.

2) `greater` se `v` for `less`, `less` se `v` for `greater`, caso contrário `v`. 

### Exemplo

Execute este código
```cpp
    #include <compare>
    #include <iostream>
    
    struct Point
    {
        int x{}, y{};
    
        friend constexpr std::strong_ordering operator<=>(Point lhs, Point rhs)
        {
            if (lhs.x < rhs.x or (lhs.x == rhs.x and lhs.y < rhs.y))
                return std::strong_ordering::less;
            if (lhs.x > rhs.x or (lhs.x == rhs.x and lhs.y > rhs.y))
                return std::strong_ordering::greater;
            return std::strong_ordering::equivalent;
        }
    
        friend std::ostream& operator<<(std::ostream& os, Point s)
        {
            return os << '(' << s.x << ',' << s.y << ')';
        }
    };
    
    void print_three_way_comparison(const auto& p, const auto& q)
    {
        const auto cmp{p <=> q};
        std::cout << p
                  << (cmp < 0 ? " <  " : cmp > 0 ? " >  " : " == " ) // compares with 0
                  << q << '\n';
    }
    
    void print_two_way_comparison(const auto& p, const auto& q)
    {
        std::cout << p
                  << (p < q ? " <  " : p > q ? " >  " : " == ") // compares p and q
                  << q << '\n';
    }
    
    int main()
    {
        const Point p1{0, 1}, p2{0, 1}, p3{0, 2};
    
        print_three_way_comparison(p1, p2);
        print_two_way_comparison(p1, p2);
    
        print_three_way_comparison(p2, p3);
        print_two_way_comparison(p2, p3);
    
        print_three_way_comparison(p3, p2);
        print_two_way_comparison(p3, p2);
    }
```

Saída: 
```
    (0,1) == (0,1)
    (0,1) == (0,1)
    (0,1) <  (0,2)
    (0,1) <  (0,2)
    (0,2) >  (0,1)
    (0,2) >  (0,1)
```

### Veja também

[ weak_ordering](<#/doc/utility/compare/weak_ordering>)(C++20) |  o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e não é substituível   
(classe)  
[ partial_ordering](<#/doc/utility/compare/partial_ordering>)(C++20) |  o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores, não é substituível e permite valores incomparáveis   
(classe)