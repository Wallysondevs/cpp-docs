# std::never_stop_token

Definido no cabeçalho `[<stop_token>](<#/doc/header/stop_token>)`

```c
class never_stop_token;
```

  
A classe `never_stop_token` modela um [`unstoppable_token`](<#/doc/thread/unstoppable_token>) que fornece informação estática de que uma parada nunca é possível nem solicitada. É o tipo de stop token padrão retornado por `std::get_stop_token` se nenhum outro stop token associado estiver sendo fornecido no objeto consultável. 

### Alias de template de membro

```cpp
Tipo  |  Definição
callback_type<Callback> |  /*callback-type*/
onde o tipo é definido como:  | struct /*callback-type*/
{
explicit /*callback-type*/( never_stop_token,
auto&& ) noexcept {}
};  // (apenas para exposição*)
```

  
### Funções membro

stop_requested[static] |  indica que uma parada nunca pode ser solicitada   
(função membro estática pública)  
stop_possible[static] |  indica que uma parada não é possível   
(função membro estática pública)  
operator== |  compara dois objetos `never_stop_token`   
(função membro pública)  
  
##  std::never_stop_token::stop_requested

static constexpr bool stop_requested() noexcept { return false; }

  
Sempre retorna false, indicando que uma parada nunca pode ser solicitada. 

##  std::never_stop_token::stop_possible

static constexpr bool stop_possible() noexcept { return false; }

  
Sempre retorna false, indicando que uma parada não é possível. 

##  std::never_stop_token::operator==

bool operator==(const never_stop_token&) const = default;

  
Dois objetos `never_stop_token` sempre se comparam como iguais. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   