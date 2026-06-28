# std::stop_callback&lt;Callback&gt;::stop_callback

```cpp
template< class C >
explicit stop_callback( const std::stop_token& st, C&& cb ) noexcept(/*see below*/);  // (1) (desde C++20)
template< class C >
explicit stop_callback( std::stop_token&& st, C&& cb ) noexcept(/*see below*/);  // (2) (desde C++20)
stop_callback( const stop_callback& ) = delete;  // (3) (desde C++20)
stop_callback( stop_callback&& ) = delete;  // (4) (desde C++20)
```

  
Constrói um novo objeto `stop_callback`, salvando e registrando a função de callback `cb` no estado de parada associado do [`std::stop_token`](<#/doc/thread/stop_token>) fornecido, para invocação posterior caso uma parada seja solicitada na [`std::stop_source`](<#/doc/thread/stop_source>) associada. 

1) Constrói um `stop_callback` para o [`std::stop_token`](<#/doc/thread/stop_token>) `st` fornecido (copiado), com a função de callback invocável `cb` fornecida.

2) Constrói um `stop_callback` para o [`std::stop_token`](<#/doc/thread/stop_token>) `st` fornecido (movido), com a função de callback invocável `cb` fornecida.

3,4) `stop_callback` não é nem [CopyConstructible](<#/doc/named_req/CopyConstructible>) nem [MoveConstructible](<#/doc/named_req/MoveConstructible>).

Ambos os construtores participam da resolução de sobrecarga apenas se `Callback` e `C` satisfizerem [`constructible_from`](<#/doc/concepts/constructible_from>) de [std::constructible_from](<#/doc/concepts/constructible_from>)<Callback, C>. Se `Callback` e `C` satisfizerem o concept, mas falharem em satisfazer seu requisito semântico, o comportamento é indefinido. 

### Parâmetros

st  |  \-  |  um objeto [`std::stop_token`](<#/doc/thread/stop_token>) para registrar este objeto `stop_callback`   
---|---|---
cb  |  \-  |  o tipo a ser invocado se uma parada for solicitada   
  
### Exceções

1,2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept([std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<Callback, C>)

Qualquer exceção lançada pela inicialização do callback fornecido no objeto `stop_callback` através do construtor.

### Observações

Se `st.stop_requested() == true` para o [`std::stop_token`](<#/doc/thread/stop_token>) passado, então a função de callback é invocada na thread atual antes que o construtor retorne. 