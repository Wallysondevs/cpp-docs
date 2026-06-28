# std::is_object

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_object;
```

`std::is_object` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um [tipo de objeto](<#/doc/language/type-id>) (ou seja, qualquer tipo possivelmente qualificado com cv, exceto tipos de função, referência ou void), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se o programa adicionar especializações para `std::is_object` ou `std::is_object_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_object_v = is_object<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo de objeto, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    template<class T>
    struct is_object : std::integral_constant<bool,
                           std::is_scalar<T>::value ||
                           std::is_array<T>::value ||
                           std::is_union<T>::value ||
                           std::is_class<T>::value> {};
```

---

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <type_traits>
    
    #define IS_OBJECT(...) \
        std::cout << std::boolalpha << std::left << std::setw(9) << #__VA_ARGS__ \
                  << (std::is_object_v<__VA_ARGS__> ? " is object\n" \
                                                   : " is not an object\n")
    
    int main()
    {
        class cls {};
    
        IS_OBJECT(void);
        IS_OBJECT(int);
        IS_OBJECT(int&);
        IS_OBJECT(int*);
        IS_OBJECT(int*&);
        IS_OBJECT(cls);
        IS_OBJECT(cls&);
        IS_OBJECT(cls*);
        IS_OBJECT(int());
        IS_OBJECT(int(*)());
        IS_OBJECT(int(&)());
    }
```

Saída:
```
    void      is not an object
    int       is object
    int&      is not an object
    int*      is object
    int*&     is not an object
    cls       is object
    cls&      is not an object
    cls*      is object
    int()     is not an object
    int(*)()  is object
    int(&)()  is not an object
```

### Veja também

[ is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(template de classe)
[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo array
(template de classe)
[ is_union](<#/doc/types/is_union>)(C++11) | verifica se um tipo é um tipo union
(template de classe)
[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-union
(template de classe)