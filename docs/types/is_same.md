# std::is_same

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T, class U >
struct is_same;
```

Se `T` e `U` nomeiam o mesmo tipo (levando em consideração as qualificações const/volatile), fornece a constante membro value igual a true. Caso contrário, value é false.

A comutatividade é satisfeita, ou seja, para quaisquer dois tipos `T` e `U`, is_same<T, U>::value == true se e somente se is_same<U, T>::value == true.

Se o programa adicionar especializações para `std::is_same` ou `std::is_same_v`(desde C++17), o comportamento é indefinido.

### Modelo de variável auxiliar

```cpp
template< class T, class U >
constexpr bool is_same_v = is_same<T, U>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` e `U` são do mesmo tipo, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    template<class T, class U>
    struct is_same : std::false_type {};
    
    template<class T>
    struct is_same<T, T> : std::true_type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <iostream>
    #include <type_traits>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        // alguns fatos definidos pela implementação
    
        // geralmente true se 'int' for de 32 bits
        std::cout << std::is_same<int, std::int32_t>::value << ' '; // talvez true
        // possivelmente true se o modelo de dados ILP64 for usado
        std::cout << std::is_same<int, std::int64_t>::value << ' '; // talvez false
    
        // mesmos testes acima, mas usando o formato std::is_same_v<T, U> do C++17
        std::cout << std::is_same_v<int, std::int32_t> << ' ';  // talvez true
        std::cout << std::is_same_v<int, std::int64_t> << '\n'; // talvez false
    
        // compara os tipos de algumas variáveis
        long double num1 = 1.0;
        long double num2 = 2.0;
        static_assert( std::is_same_v<decltype(num1), decltype(num2)> == true );
    
        // 'float' nunca é um tipo integral
        static_assert( std::is_same<float, std::int32_t>::value == false );
    
        // 'int' é implicitamente 'signed'
        static_assert( std::is_same_v<int, int> == true );
        static_assert( std::is_same_v<int, unsigned int> == false );
        static_assert( std::is_same_v<int, signed int> == true );
    
        // ao contrário de outros tipos, 'char' não é nem 'unsigned' nem 'signed'
        static_assert( std::is_same_v<char, char> == true );
        static_assert( std::is_same_v<char, unsigned char> == false );
        static_assert( std::is_same_v<char, signed char> == false );
    
        // tipo T qualificado como const não é o mesmo que T não-const
        static_assert( !std::is_same<const int, int>() );
    }
```

Saída possível:
```
    true false true false
```

### Veja também

[ same_as](<#/doc/concepts/same_as>)(C++20) | especifica que um tipo é o mesmo que outro tipo
(concept)
[ especificador `decltype`](<#/doc/language/decltype>)(C++11) | obtém o tipo de uma expressão ou entidade