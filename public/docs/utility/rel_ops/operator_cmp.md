# std::rel_ops::operator!=,>,<=,>=

Definido no header `[<utility>](<#/doc/header/utility>)`

```cpp
template< class T >
bool operator!=( const T& lhs, const T& rhs );  // (1)
template< class T >
bool operator>( const T& lhs, const T& rhs );  // (2)
template< class T >
bool operator<=( const T& lhs, const T& rhs );  // (3)
template< class T >
bool operator>=( const T& lhs, const T& rhs );  // (4)
```

Dadas as sobrecargas de operator== e operator< definidas pelo usuário para objetos do tipo `T`, implementa a semântica usual dos outros operadores de comparação.

1) Implementa operator!= em termos de operator==.

2) Implementa operator> em termos de operator<.

3) Implementa operator<= em termos de operator<.

4) Implementa operator>= em termos de operator<.

### Parâmetros

- **lhs** — argumento do lado esquerdo
- **rhs** — argumento do lado direito

### Valor de retorno

1) Retorna true se lhs _não for igual_ a rhs.

2) Retorna true se lhs for _maior_ que rhs.

3) Retorna true se lhs for _menor ou igual_ a rhs.

4) Retorna true se lhs for _maior ou igual_ a rhs.

### Implementação possível

[(1) `operator!=`](<#/doc/utility/rel_ops/operator_cmp>)
```cpp
    namespace rel_ops
    {
        template<class T>
        bool operator!=(const T& lhs, const T& rhs)
        {
            return !(lhs == rhs);
        }
    }
```

[(2) `operator>`](<#/doc/utility/rel_ops/operator_cmp>)
```cpp
    namespace rel_ops
    {
        template<class T>
        bool operator>(const T& lhs, const T& rhs)
        {
            return rhs < lhs;
        }
    }
```

[(3) `operator<=`](<#/doc/utility/rel_ops/operator_cmp>)
```cpp
    namespace rel_ops
    {
        template<class T>
        bool operator<=(const T& lhs, const T& rhs)
        {
            return !(rhs < lhs);
        }
    }
```

[(4) `operator>=`](<#/doc/utility/rel_ops/operator_cmp>)
```cpp
    namespace rel_ops
    {
        template<class T>
        bool operator>=(const T& lhs, const T& rhs)
        {
            return !(lhs < rhs);
        }
    }
```

### Observações

[Boost.operators](<https://www.boost.org/doc/libs/release/libs/utility/operators.htm>) oferece uma alternativa mais versátil a `std::rel_ops`.

A partir de C++20, `std::rel_ops` são obsoletos em favor de [`operator<=>`](<#/doc/language/default_comparisons>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <utility>
    
    struct Foo
    {
        int n;
    };
    
    bool operator==(const Foo& lhs, const Foo& rhs)
    {
        return lhs.n == rhs.n;
    }
    
    bool operator<(const Foo& lhs, const Foo& rhs)
    {
        return lhs.n < rhs.n;
    }
    
    int main()
    {
        Foo f1 = {1};
        Foo f2 = {2};
        using namespace std::rel_ops;
    
        std::cout << std::boolalpha
                  << "{1} != {2} : " << (f1 != f2) << '\n'
                  << "{1} >  {2} : " << (f1 >  f2) << '\n'
                  << "{1} <= {2} : " << (f1 <= f2) << '\n'
                  << "{1} >= {2} : " << (f1 >= f2) << '\n';
    }
```

Saída:
```
    {1} != {2} : true
    {1} >  {2} : false
    {1} <= {2} : true
    {1} >= {2} : false
```