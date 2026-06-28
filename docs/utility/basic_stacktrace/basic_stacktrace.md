# std::basic_stacktrace&lt;Allocator&gt;::basic_stacktrace

```cpp
basic_stacktrace() noexcept(/* see below */);  // (1) (desde C++23)
explicit basic_stacktrace( const allocator_type& alloc ) noexcept;  // (2) (desde C++23)
basic_stacktrace( const basic_stacktrace& other );  // (3) (desde C++23)
basic_stacktrace( basic_stacktrace&& other ) noexcept;  // (4) (desde C++23)
basic_stacktrace( const basic_stacktrace& other,
const allocator_type& alloc );  // (5) (desde C++23)
basic_stacktrace( basic_stacktrace&& other, const allocator_type& alloc );  // (6) (desde C++23)
```

  
Constrói um `basic_stacktrace` vazio, ou copia/move de `other`.

1) Construtor padrão. Constrói um `basic_stacktrace` vazio com um `allocator` construído por padrão.

2) Constrói um `basic_stacktrace` vazio usando `alloc` como o `allocator`.

3) Construtor de cópia. Constrói um `basic_stacktrace` com a cópia do conteúdo de `other`, o `allocator` é obtido como se chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::select_on_container_copy_construction(other.get_allocator()).

4) Construtor de movimento. Constrói um `basic_stacktrace` com o conteúdo de `other` usando `move semantics`. O `allocator` é construído por movimento a partir do de `other`. Após a construção, `other` é deixado em um estado válido, mas não especificado.

5) O mesmo que o construtor de cópia, exceto que `alloc` é usado como o `allocator`.

6) Comporta-se da mesma forma que o construtor de movimento se `alloc == other.get_allocator()`. Caso contrário, aloca memória com `alloc` e realiza movimento elemento a elemento. `alloc` é usado como o `allocator`.

(3,5,6) podem lançar uma exceção ou construir um `basic_stacktrace` vazio em caso de falha na alocação.

### Parâmetros

alloc  |  \-  |  `allocator` a ser usado para todas as alocações de memória do `basic_stacktrace` construído  
---|---|---
other  |  \-  |  outro `basic_stacktrace` para copiar/mover de   
  
### Exceções

1)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept([std::is_nothrow_default_constructible_v](<#/doc/types/is_default_constructible>)<allocator_type>)

3,5,6) Podem propagar a exceção lançada em caso de falha na alocação.

### Complexidade

1,2) Constante.

3) Linear no tamanho de `other`.

4) Constante.

5) Linear no tamanho de `other`.

6) Linear no tamanho de `other` se `alloc != other.get_allocator()`, caso contrário constante.

### Notas

Após a construção por movimento do container (sobrecarga (4)), referências, ponteiros e iteradores (exceto o iterador `end`) para `other` permanecem válidos, mas referem-se a elementos que agora estão em `*this`. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está em consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>). 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ operator=](<#/>) |  atribui ao `basic_stacktrace`   
(função membro pública)  
[ current](<#/doc/utility/basic_stacktrace/current>)[static] |  obtém o `stacktrace` atual ou sua parte especificada   
(função membro estática pública)