# std::default_delete

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T > struct default_delete;
template< class T > struct default_delete<T[]>;
```

`std::default_delete` é a política de destruição padrão usada por [std::unique_ptr](<#/doc/memory/unique_ptr>) quando nenhum deleter é especificado. Especializações de `default_delete` são classes vazias em implementações típicas e são usadas na [otimização de classe base vazia](<#/doc/language/ebo>).

1) O `default_delete` não especializado usa `delete` para desalocar memória para um único objeto.

2) Uma especialização parcial para tipos de array que usa `delete[]` também é fornecida.

### Funções membro

**(construtor)** | constrói um objeto `default_delete`
(função membro pública)
** operator()** | deleta o objeto ou array
(função membro pública)

## std::default_delete::default_delete

```cpp
constexpr default_delete() noexcept = default;  // (1)
Especializações de template primário
template< class U >
default_delete( const default_delete<U>& d ) noexcept;  // (2) (desde C++11)
(constexpr desde C++23)
Especializações de array
template< class U >
default_delete( const default_delete<U[]>& d ) noexcept;  // (3) (desde C++11)
(constexpr desde C++23)
```

1) Constrói um objeto `std::default_delete`.

2) Constrói um objeto `std::default_delete<T>` a partir de outro objeto `std::default_delete`.

Esta sobrecarga participa da resolução de sobrecarga somente se `U*` for implicitamente conversível para `T*`.

3) Constrói um objeto `std::default_delete<T[]>` a partir de outro objeto `std::default_delete<U[]>`.

Esta sobrecarga participa da resolução de sobrecarga somente se `U(*)[]` for implicitamente conversível para `T(*)[]`.

### Parâmetros

- **d** — um deleter para copiar

### Notas

O template de [construtor de conversão](<#/doc/language/converting_constructor>) de `std::default_delete` torna possível a conversão implícita de [std::unique_ptr](<#/doc/memory/unique_ptr>)&lt;Derived&gt; para [std::unique_ptr](<#/doc/memory/unique_ptr>)&lt;Base&gt;.

## std::default_delete::operator()

```cpp
Especializações de template primário
void operator()( T* ptr ) const;  // (1) (desde C++11)
(constexpr desde C++23)
Especializações de array
template< class U >
void operator()( U* ptr ) const;  // (2) (desde C++11)
(constexpr desde C++23)
```

1) Chama `delete` em `ptr`.

2) Chama `delete[]` em `ptr`.

Esta sobrecarga participa da resolução de sobrecarga somente se `U(*)[]` for implicitamente conversível para `T(*)[]`.

Se `U` for um tipo incompleto, o programa é malformado.

### Parâmetros

- **ptr** — um objeto ou array para deletar

### Exceções

Nenhuma garantia de exceção.

### Invocando sobre Tipos Incompletos

No ponto do código em que o operator() é chamado, o tipo deve ser completo. Em algumas implementações, um `static_assert` é usado para garantir que este seja o caso. A razão para este requisito é que chamar [`delete`](<#/doc/language/delete>) em um tipo incompleto é comportamento indefinido em C++ se o tipo de classe completo tiver um destrutor não trivial ou uma função de desalocação, pois o compilador não tem como saber se tais funções existem e devem ser invocadas.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_memory`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | construtor constexpr e operator()

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <memory>
    #include <vector>
    
    int main()
    {
    //  {
    //      std::shared_ptr<int> shared_bad(new int[10]);
    //  } // o destrutor chama delete, comportamento indefinido
    
        {
            std::shared_ptr<int> shared_good(new int[10], std::default_delete<int[]>());
        } // OK: o destrutor chama delete[]
    
        {
            std::unique_ptr<int> ptr(new int(5));
        } // unique_ptr<int> usa default_delete<int>
    
        {
            std::unique_ptr<int[]> ptr(new int[10]);
        } // unique_ptr<int[]> usa default_delete<int[]>
    
        // default_delete pode ser usado onde um functor de exclusão é necessário
        std::vector<int*> v;
        for (int n = 0; n < 100; ++n)
            v.push_back(new int(n));
        std::for_each(v.begin(), v.end(), std::default_delete<int>());
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

RD | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2118](<https://cplusplus.github.io/LWG/issue2118>) | C++11 | funções membro das especializações de array rejeitaram conversões de qualificação | aceitaram

### Ver também

[ unique_ptr](<#/doc/memory/unique_ptr>)(C++11) | ponteiro inteligente com semântica de propriedade única de objeto
(modelo de classe)