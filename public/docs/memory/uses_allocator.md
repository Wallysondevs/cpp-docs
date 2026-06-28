# std::uses_allocator

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T, class Alloc >
struct uses_allocator;
```

Se `T` possui um tipo aninhado `allocator_type` que é conversível de `Alloc`, o valor da constante membro é true. Caso contrário, o valor é false.

### Template de variável auxiliar

```cpp
template< class T, class Alloc >
constexpr bool uses_allocator_v = uses_allocator<T, Alloc>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` usa o alocador `Alloc`, false caso contrário
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

### Construção com uso de alocador

Existem três convenções para passar um alocador `alloc` para um construtor de algum tipo `T`:

  * Se `T` não usa um alocador compatível (`std::uses_allocator_v<T, Alloc>` é false), então `alloc` é ignorado.
  * Caso contrário, `std::uses_allocator_v<T, Alloc>` é true, e

    

  * se `T` usa a _convenção de alocador inicial_ (é invocável como T([std::allocator_arg](<#/doc/memory/allocator_arg_t>), alloc, args...)), então a construção com uso de alocador usa esta forma.
  * se `T` usa a _convenção de alocador final_ (é invocável como T(args..., alloc)), então a construção com uso de alocador usa esta forma.
  * Caso contrário, o programa é malformado (isso significa que `std::uses_allocator_v<T, Alloc>` é true, mas o tipo não segue nenhuma das duas convenções permitidas).

  * Como um caso especial, [std::pair](<#/doc/utility/pair>) é tratado como um tipo que usa alocador, mesmo que `std::uses_allocator` seja false para pairs (ao contrário, por exemplo, de [std::tuple](<#/doc/utility/tuple>)): veja as sobrecargas específicas para `pair` de [std::pmr::polymorphic_allocator::construct](<#/doc/memory/polymorphic_allocator/construct>) e [std::scoped_allocator_adaptor::construct](<#/doc/memory/scoped_allocator_adaptor/construct>)(até C++20)[std::uses_allocator_construction_args](<#/doc/memory/uses_allocator_construction_args>)(desde C++20).

As funções de utilidade [std::make_obj_using_allocator](<#/doc/memory/make_obj_using_allocator>) e [std::uninitialized_construct_using_allocator](<#/doc/memory/uninitialized_construct_using_allocator>) podem ser usadas para criar explicitamente um objeto seguindo o protocolo acima, e [std::uses_allocator_construction_args](<#/doc/memory/uses_allocator_construction_args>) pode ser usada para preparar a lista de argumentos que corresponde à modalidade de construção com uso de alocador esperada pelo tipo. | (desde C++20)

### Especializações

Dado um [tipo definido pelo programa](<#/doc/language/type-id>) `T` que não possui um tipo aninhado `allocator_type`, um programa pode especializar `std::uses_allocator` para derivar de [std::true_type](<#/doc/types/integral_constant>) para `T` se qualquer um dos seguintes requisitos for satisfeito:

  * `T` possui um construtor que recebe [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>) como o primeiro argumento, e `Alloc` como o segundo argumento.
  * `T` possui um construtor que recebe `Alloc` como o último argumento.

No que precede, `Alloc` é um tipo que satisfaz [Allocator](<#/doc/named_req/Allocator>) ou é um tipo ponteiro conversível para `std::experimental::pmr::memory_resource*`(library fundamentals TS).

As seguintes especializações já são fornecidas pela biblioteca padrão:

[ std::uses_allocator<std::tuple>](<#/doc/utility/tuple/uses_allocator>)(C++11) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::queue>](<#/doc/container/queue/uses_allocator>)(C++11) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::priority_queue>](<#/doc/container/priority_queue/uses_allocator>)(C++11) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::stack>](<#/doc/container/stack/uses_allocator>)(C++11) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::flat_map>](<#/doc/container/flat_map/uses_allocator>)(C++23) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::flat_set>](<#/doc/container/flat_set/uses_allocator>)(C++23) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::flat_multimap>](<#/doc/container/flat_multimap/uses_allocator>)(C++23) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::flat_multiset>](<#/doc/container/flat_multiset/uses_allocator>)(C++23) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::function>](<#/doc/utility/functional/function/uses_allocator>)(C++11) (até C++17) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::promise>](<#/doc/thread/promise/uses_allocator>)(C++11) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)
[ std::uses_allocator<std::packaged_task>](<#/doc/thread/packaged_task/uses_allocator>)(C++11) (até C++17) | especializa o trait de tipo **std::uses_allocator**
(especialização de template de classe)

### Observações

Este trait de tipo é usado por [std::tuple](<#/doc/utility/tuple>), [std::scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>) e [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>). Ele também pode ser usado por alocadores personalizados ou tipos wrapper para determinar se o objeto ou membro sendo construído é capaz de usar um alocador (por exemplo, é um container), caso em que um alocador deve ser passado para seu construtor.

### Veja também

[ allocator_argallocator_arg_t](<#/doc/memory/allocator_arg_t>)(C++11) | uma tag usada para selecionar construtores cientes de alocador
(tag)
[ uses_allocator_construction_args](<#/doc/memory/uses_allocator_construction_args>)(C++20) | prepara a lista de argumentos que corresponde à modalidade de construção com uso de alocador exigida pelo tipo fornecido
(template de função)
[ make_obj_using_allocator](<#/doc/memory/make_obj_using_allocator>)(C++20) | cria um objeto do tipo fornecido por meio de construção com uso de alocador
(template de função)
[ uninitialized_construct_using_allocator](<#/doc/memory/uninitialized_construct_using_allocator>)(C++20) | cria um objeto do tipo fornecido em um local de memória especificado por meio de construção com uso de alocador
(template de função)
[ scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>)(C++11) | implementa alocador multinível para containers multinível
(template de classe)