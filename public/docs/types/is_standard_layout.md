# std::is_standard_layout

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_standard_layout;
```

`std::is_standard_layout` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um [tipo standard-layout](<#/doc/named_req/StandardLayoutType>), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)&lt;T&gt; é um tipo incompleto e não (possivelmente cv-qualificado) void, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_standard_layout` ou `std::is_standard_layout_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo para verificar

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_standard_layout_v = is_standard_layout<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo standard-layout, false caso contrário
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

### Notas

Um ponteiro para uma classe standard-layout pode ser convertido (com reinterpret_cast) para um ponteiro para seu primeiro membro de dados não estático e vice-versa.

Se uma union standard-layout contém duas ou mais structs standard-layout, é permitido inspecionar a parte inicial comum delas.

A macro [offsetof](<#/doc/types/offsetof>) tem garantia de ser utilizável apenas com classes standard-layout.

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct A { int m; };
    static_assert(std::is_standard_layout_v<A> == true);
    
    class B: public A { int m; };
    static_assert(std::is_standard_layout_v<B> == false);
    
    struct C { virtual void foo(); };
    static_assert(std::is_standard_layout_v<C> == false);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | `T` poderia ser um array de tipo de classe incompleto com limite desconhecido | o comportamento é indefinido neste caso

### Veja também

[ is_trivially_copyable](<#/doc/types/is_trivially_copyable>)(C++11) | verifica se um tipo é trivially copyable
(template de classe)
[ is_pod](<#/doc/types/is_pod>)(C++11)(obsoleto em C++20) | verifica se um tipo é um tipo plain-old data (POD)
(template de classe)
[ offsetof](<#/doc/types/offsetof>) | deslocamento em bytes do início de um tipo [standard-layout](<#/doc/named_req/StandardLayoutType>) para o membro especificado
(macro de função)