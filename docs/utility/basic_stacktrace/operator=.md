# std::basic_stacktrace&lt;Allocator&gt;::operator=

```cpp
basic_stacktrace& operator=( const basic_stacktrace& other );  // (1) (desde C++23)
basic_stacktrace& operator=( basic_stacktrace&& other )
noexcept(/* see below */);  // (2) (desde C++23)
```

Substitui o conteúdo do `basic_stacktrace`.

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de other.

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_copy_assignment::value for true, o alocador de *this é substituído por uma cópia do alocador de other. Se o alocador de *this após a atribuição for diferente do seu valor antigo, o alocador antigo é usado para desalocar a memória, então o novo alocador é usado para alocá-la antes de copiar as entradas. Caso contrário, a memória possuída por *this pode ser reutilizada quando possível.

2) Operador de atribuição por movimento (move assignment operator). Substitui o conteúdo pelo de other usando move semantics (ou seja, os dados em other são movidos de other para *this). other fica em um estado válido, mas não especificado, depois.

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_move_assignment::value for true, o alocador de *this é substituído por uma cópia do alocador de other. Se for false e os alocadores de *this e other não forem iguais, *this não pode assumir a propriedade da memória possuída por other e deve atribuir cada entrada individualmente, alocando memória adicional usando seu próprio alocador conforme necessário.

Em qualquer caso, as entradas do stacktrace que originalmente pertenciam a *this podem ser destruídas ou substituídas por atribuição elemento a elemento.

*this pode ser definido como vazio em caso de falha de alocação se a implementação fortalecer a especificação de exceção.

### Parâmetros

- **other** — outro `basic_stacktrace` para usar como fonte

### Valor de retorno

*this

### Complexidade

1) Linear no tamanho de *this e other.

2) Linear no tamanho de *this, a menos que os alocadores não sejam iguais e não se propaguem, caso em que é linear no tamanho de *this e other.

### Exceções

1) Pode lançar exceções definidas pela implementação.

2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::propagate_on_container_move_assignment::value
|| [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::is_always_equal::value)

### Notas

Após a atribuição por movimento de container (sobrecarga (2)), a menos que a atribuição por movimento elemento a elemento seja forçada por alocadores incompatíveis, referências, ponteiros e iterators (exceto o iterator de fim) para `other` permanecem válidos, mas referem-se a elementos que agora estão em *this. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está sob consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ (construtor)](<#/doc/utility/basic_stacktrace/basic_stacktrace>) | cria um novo `basic_stacktrace`
(função membro pública)