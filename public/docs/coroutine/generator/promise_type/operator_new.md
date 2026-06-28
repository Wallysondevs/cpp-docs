# std::generator&lt;Ref,V,Allocator&gt;::promise_type::operator new

```cpp
void* operator new( std::size_t size )
requires std::same_as<Allocator, void>
std::default_initializable<Allocator>;  // (1) (desde C++23)
template< class Alloc, class... Args >
void* operator new( std::size_t size, std::allocator_arg_t,
const Alloc& alloc, const Args&... );  // (2) (desde C++23)
template< class This, class Alloc, class... Args >
void* operator new( std::size_t size, const This&, std::allocator_arg_t,
const Alloc& alloc, const Args&... );  // (3) (desde C++23)
```

  
[Aloca](<#/doc/language/coroutines>) `size` bytes de armazenamento não inicializado usando o alocador padrão ou fornecido pelo usuário.

Seja `A`

  * `Allocator`, se não for void,
  * `Alloc` para (2,3), ou
  * [std::allocator](<#/doc/memory/allocator>)&lt;void&gt; caso contrário.

Seja `B` [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::template rebind_alloc&lt;U&gt; onde `U` é um tipo não especificado cujo tamanho e alinhamento são ambos [`__STDCPP_DEFAULT_NEW_ALIGNMENT__`](<#/doc/preprocessor/replace>).

Inicializa um alocador b do tipo `B` com:

1) A(),

2,3) A(alloc).

Usa b para alocar armazenamento para o menor array de `U` suficiente para fornecer armazenamento para um [estado de corrotina](<#/doc/language/coroutines>) de tamanho `size`, e estado adicional não especificado necessário para garantir que [`operator delete`](<#/doc/coroutine/generator/promise_type/operator_delete>) possa posteriormente desalocar este bloco de memória com um alocador igual a b.

O programa é malformado a menos que [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;B&gt;::pointer seja um tipo ponteiro e, para as sobrecargas ([2,3](<#/doc/coroutine/generator/promise_type/operator_new>)), [std::same_as](<#/doc/concepts/same_as>)<Allocator, void> || [std::convertible_to](<#/doc/concepts/convertible_to>)&lt;const Alloc&, Allocator&gt; seja modelado.

### Parâmetros

size  |  \-  |  o tamanho do armazenamento a ser alocado   
---|---|---
alloc  |  \-  |  um alocador fornecido pelo usuário do tipo `Alloc`  
  
### Valor de retorno

Um ponteiro para o armazenamento alocado.

### Exceções

1-3) Pode lançar.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3900](<https://cplusplus.github.io/LWG/issue3900>) | C++23  | sobrecargas ([2,3](<#/doc/coroutine/generator/promise_type/operator_new>)) eram restritas à conversão de `Alloc` para `Allocator` | obrigatório 