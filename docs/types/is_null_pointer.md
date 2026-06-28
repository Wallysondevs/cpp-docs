# std::is_null_pointer

Definido no header `[<type_traits>](<#/doc/header/type_traits>)`

```cpp
template< class T >
struct is_null_pointer;  // (desde C++11)
```

`std::is_null_pointer` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é do tipo [std::nullptr_t](<#/doc/types/nullptr_t>).

Fornece a constante membro `value` que é igual a `true` se `T` for do tipo [std::nullptr_t](<#/doc/types/nullptr_t>), `const std::nullptr_t`, `volatile std::nullptr_t`, ou `const volatile std::nullptr_t`.

Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_null_pointer` ou `std::is_null_pointer_v` (desde C++17), o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_null_pointer_v = is_null_pointer<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` for do tipo [std::nullptr_t](<#/doc/types/nullptr_t>) (possivelmente cv-qualificado), `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Implementação possível
```cpp
    template<class T>
    struct is_null_pointer : std::is_same<std::nullptr_t, std::remove_cv_t<T>> {};
```

---

### Notas

[std::is_pointer](<#/doc/types/is_pointer>) é `false` para [std::nullptr_t](<#/doc/types/nullptr_t>) porque não é um tipo de ponteiro embutido.

No libc++, `std::is_null_pointer` não está disponível no modo C++11.

Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_lib_is_null_pointer`](<#/doc/feature_test>) | [`201309L`](<#/>) | (C++14)
(DR11) | `std::is_null_pointer`

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    static_assert(std::is_null_pointer_v<decltype(nullptr)>);
    static_assert(!std::is_null_pointer_v<int*>);
    static_assert(!std::is_pointer_v<decltype(nullptr)>);
    static_assert(std::is_pointer_v<int*>);
    
    int main()
    {
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2247](<https://cplusplus.github.io/LWG/issue2247>) | C++11 | o type trait para detectar [std::nullptr_t](<#/doc/types/nullptr_t>) estava faltando | adicionado

### Veja também

[ is_void](<#/doc/types/is_void>)(C++11) | verifica se um tipo é `void`
(template de classe)
[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo de array
(template de classe)
[ is_pointer](<#/doc/types/is_pointer>)(C++11) | verifica se um tipo é um tipo de ponteiro
(template de classe)
[ is_enum](<#/doc/types/is_enum>)(C++11) | verifica se um tipo é um tipo de enumeração
(template de classe)
[ is_union](<#/doc/types/is_union>)(C++11) | verifica se um tipo é um tipo de união
(template de classe)
[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-união
(template de classe)
[ is_function](<#/doc/types/is_function>)(C++11) | verifica se um tipo é um tipo de função
(template de classe)
[ is_object](<#/doc/types/is_object>)(C++11) | verifica se um tipo é um tipo de objeto
(template de classe)