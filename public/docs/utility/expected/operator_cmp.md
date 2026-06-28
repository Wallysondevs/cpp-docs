# operator==(std::expected)

```cpp
Modelo primário
template< class T2, class E2 >
requires (!std::is_void_v<T2>)
friend constexpr bool operator==( const expected& lhs,
const std::expected<T2, E2>& rhs );  // (1) (desde C++23)
template< class E2 >
friend constexpr bool operator==( const expected& lhs,
const std::unexpected<E2>& unex );  // (2) (desde C++23)
template< class T2 >
friend constexpr bool operator==( const expected& lhs, const T2& val );  // (3) (desde C++23)
Especialização parcial para void
template< class T2, class E2 >
requires std::is_void_v<T2>
friend constexpr bool operator==( const expected& lhs,
const std::expected<T2, E2>& rhs );  // (4) (desde C++23)
template< class E2 >
friend constexpr bool operator==( const expected& lhs,
const std::unexpected<E2>& unex );  // (5) (desde C++23)
```

  
Realiza operações de comparação em objetos std::expected.

1) Compara dois objetos std::expected. Os objetos são considerados iguais se e somente se ambos lhs e rhs contiverem valores esperados que são iguais, ou ambos contiverem valores inesperados que são iguais. Se qualquer uma das seguintes expressões for malformada, ou seu resultado não for conversível para bool, o programa é malformado: | (até C++26)  
---|---
Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes expressões forem bem-formadas e seus resultados forem conversíveis para bool: | (desde C++26)  
  
  * *lhs == *rhs
  * lhs.error() == rhs.error()

2) Compara um objeto std::expected com um objeto [std::unexpected](<#/doc/error/unexpected>). Os objetos são considerados iguais se e somente se lhs contiver um valor inesperado que seja igual a unex.error(). Se a expressão lhs.error() == unex.error() for malformada, ou seu resultado não for conversível para bool, o programa é malformado. | (até C++26)  
---|---
Esta sobrecarga participa da resolução de sobrecarga somente se a expressão lhs.error() == unex.error() for bem-formada e seu resultado for conversível para bool. | (desde C++26)  
  
3) Compara um objeto std::expected com um valor esperado. Os objetos são considerados iguais se e somente se lhs contiver um valor esperado que seja igual a val. Se a expressão *lhs == val for malformada, ou seu resultado não for conversível para bool, o programa é malformado. | (até C++26)  
Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: 

  * `T2` não é uma especialização de std::expected. 
  * A expressão *lhs == val é bem-formada, e seu resultado é conversível para bool. 

| (desde C++26)  
  
4) Compara dois objetos std::expected. Os objetos são considerados iguais se e somente se lhs e rhs ambos representarem valores esperados, ou ambos contiverem valores inesperados que são iguais. Se a expressão lhs.error() == rhs.error() for malformada, ou seu resultado não for conversível para bool, o programa é malformado. | (até C++26)  
---|---
Esta sobrecarga participa da resolução de sobrecarga somente se a expressão lhs.error() == rhs.error() for bem-formada e seu resultado for conversível para bool. | (desde C++26)  
  
5) Compara um objeto std::expected com um objeto [std::unexpected](<#/doc/error/unexpected>). Os objetos são considerados iguais se e somente se lhs contiver um valor inesperado que seja igual a unex.error(). Se a expressão lhs.error() == unex.error() for malformada, ou seu resultado não for conversível para bool, o programa é malformado. | (até C++26)  
---|---
Esta sobrecarga participa da resolução de sobrecarga somente se a expressão lhs.error() == unex.error() for bem-formada e seu resultado for conversível para bool. | (desde C++26)  
  
Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [lookup dependente de argumento](<#/doc/language/adl>) quando `std::expected<T, E>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

lhs, rhs  |  \-  |  objeto(s) std::expected para comparar   
---|---|---
unex  |  \-  |  valor [std::unexpected](<#/doc/error/unexpected>) para comparar com lhs  
val  |  \-  |  valor para comparar com o valor esperado contido em lhs  
  
### Valor de retorno

1) lhs.has_value() != rhs.has_value() ? false :  
(lhs.has_value() ? *lhs == *rhs : lhs.error() == rhs.error())

2) !lhs.has_value() && static_cast&lt;bool&gt;(lhs.error() == unex.error())

3) lhs.has_value() && static_cast&lt;bool&gt;(*lhs == val)

4) lhs.has_value() != rhs.has_value() ? false :  
lhs.has_value() || static_cast&lt;bool&gt;(lhs.error() == rhs.error())

5) !lhs.has_value() && static_cast&lt;bool&gt;(lhs.error() == unex.error())

### Exceções

Lança exceções quando e o que a comparação lança.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_constrained_equality`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | operadores de comparação restritos para std::expected  
  
### Exemplo

Execute este código
```cpp
    #include <expected>
    #include <iostream>
    #include <string_view>
    
    using namespace std::string_view_literals;
    
    int main()
    {
        auto x1{"\N{GREEN HEART}"sv};
        auto x2{"\N{CROSS MARK}"sv};
        std::expected<std::string_view, int> e1{x1}, e2{x1}, e3{x2};
        std::unexpected u1{13};
    
        std::cout << "Overload (1):\n"
                  << e1.value() << (e1 == e2 ? " == " : " != ") << *e2 << '\n'
                  << e1.value() << (e1 != e3 ? " != " : " == ") << *e3 << "\n\n";
    
        std::cout << "Overload (2):\n"
                  << e1.value() << (e1 == u1 ? " == " : " != ") << u1.error() << '\n';
        e1 = std::unexpected{13};
        std::cout << e1.error() << (e1 == u1 ? " == " : " != ") << u1.error() << '\n';
        e1 = std::unexpected{31};
        std::cout << e1.error() << (e1 != u1 ? " != " : " == ") << u1.error() << '\n';
    
        std::cout << "Overload (3):\n"
                  << *e1 << (e1 == x1 ? " == " : " != ") << x1 << '\n'
                  << *e1 << (e1 != x2 ? " != " : " == ") << x2 << "\n\n";
    }
```

Saída: 
```
    Overload (1):
    💚 == 💚
    💚 != ❌
    
    Overload (2):
    💚 != 13
    13 == 13
    31 != 13
    
    Overload (3):
    💚 == 💚
    💚 != ❌
```

### Veja também

[ unexpected](<#/doc/utility/expected/unexpected>)(C++23) | representado como um valor inesperado   
(modelo de classe)  