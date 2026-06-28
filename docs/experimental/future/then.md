# std::experimental::future&lt;T&gt;::then

template< class F >  
future</* see below */> then( F&& func ) ;

  
Anexa a continuação `func` a `*this`. O comportamento é indefinido se `*this` não tiver estado compartilhado associado (ou seja, `valid() == false`).

Cria um estado compartilhado associado ao objeto `future` a ser retornado, e uma cópia `fd` de `func` construída como se por `DECAY_COPY([std::forward](<#/doc/utility/forward>)<F>(func))` avaliado na thread que chama `then`, onde `DECAY_COPY` é definido como
```cpp
    template<class T>
    std::decay_t<T> DECAY_COPY(T&& v)
    {
        return std::forward<T>(v);
    }
```
  
---  
  
Quando o estado compartilhado atualmente associado a `*this` estiver pronto, a _continuação_ `INVOKE(std::move(fd), std::move(*this))` é chamada em uma thread de execução não especificada, onde `INVOKE` é a operação definida em [Callable](<#/doc/named_req/Callable>). Se essa expressão for inválida, o comportamento é indefinido.

Qualquer valor retornado da continuação é armazenado como o resultado no estado compartilhado do objeto `future` retornado. Qualquer exceção propagada da execução da continuação é armazenada como o resultado excepcional no estado compartilhado do objeto `future` retornado.

Seja `U` o tipo de retorno da continuação (ou seja, [std::result_of_t](<#/doc/types/result_of>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;([std::experimental::future](<#/doc/experimental/future>)&lt;T&gt;)>). Se `U` for [std::experimental::future](<#/doc/experimental/future>)&lt;T2&gt; para algum tipo `T2`, então o tipo de retorno de `then` é [std::experimental::future](<#/doc/experimental/future>)&lt;T2&gt;, caso contrário, é [std::experimental::future](<#/doc/experimental/future>)&lt;U&gt;. Isso é conhecido como _desembrulhamento implícito_.

Se o desembrulhamento implícito ocorrer e a continuação retornar um `future` inválido, então o estado compartilhado é preparado com uma exceção do tipo [std::future_error](<#/doc/thread/future_error>) com uma condição de erro de [std::future_errc::broken_promise](<#/doc/thread/future_errc>).

Após esta função retornar, `valid()` é `false`.

### Parâmetros

func  |  \-  |  uma continuação a ser anexada   
  
### Valor de retorno

Um objeto `std::experimental::future` associado ao estado compartilhado criado por este objeto. `valid() == true` para o objeto retornado.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   