# std::experimental::make_observer

Definido no cabeçalho `[<experimental/memory>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/memory&action=edit&redlink=1> "cpp/header/experimental/memory \(page does not exist\)")`

```c
template< class W >
std::experimental::observer_ptr<W> make_observer( W* p ) noexcept;
```

  
Cria um objeto `observer_ptr`, deduzindo o argumento de template a partir do tipo do argumento da função. 

### Parâmetros

p  |  \-  |  ponteiro para o objeto a ser observado pelo objeto `observer_ptr`   
  
### Valor de retorno

Um objeto `observer_ptr`, criado como se por [std::experimental::observer_ptr](<#/doc/experimental/observer_ptr>)&lt;W&gt;(p). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   