# Requisitos nomeados C++: EmplaceConstructible (desde C++11)

Especifica que um objeto do tipo pode ser construído a partir de um dado conjunto de argumentos em armazenamento não inicializado por um dado alocador.

### Requisitos

O tipo `T` é **EmplaceConstructible** no [Container](<#/doc/named_req/Container>) `X` (cujo `value_type` é idêntico a `T`) a partir dos argumentos `args` se, dado

`A` | um tipo de alocador
---|---
`m` | um lvalue do tipo `A`
`p` | o ponteiro do tipo `T*` preparado pelo container
`args` | zero ou mais argumentos

onde `X::allocator_type` é idêntico a [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::rebind_alloc&lt;T&gt;,

a seguinte expressão é bem-formada:
```cpp
    std::allocator_traits<A>::construct(m, p, args);
```

Se `X` não é sensível a alocador ou é uma especialização de [std::basic_string](<#/doc/string/basic_string>), o termo é definido como se `A` fosse std::allocator&lt;T&gt;, exceto que nenhum objeto alocador precisa ser criado, e especializações definidas pelo usuário de [std::allocator](<#/doc/memory/allocator>) não são instanciadas.

### Notas

Embora seja exigido que `construct` customizado seja usado ao construir elementos de [std::basic_string](<#/doc/string/basic_string>) até C++23, todas as implementações usaram apenas o mecanismo padrão. O requisito é corrigido por [P1072R10](<https://wg21.link/P1072R10>) para corresponder à prática existente.

### Ver também

[CopyInsertable](<#/doc/named_req/CopyInsertable>)
---
[MoveInsertable](<#/doc/named_req/MoveInsertable>)