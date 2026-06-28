# std::wbuffer_convert&lt;Codecvt,Elem,Tr&gt;::state

state_type state() const;

  
Retorna o valor atual do estado de conversão, que é armazenado neste objeto `wbuffer_convert`. O estado de conversão pode ser explicitamente definido no construtor e é atualizado por todas as operações de conversão.

### Valor de retorno

`_[cvtstate](<#/doc/locale/wbuffer_convert>)_`

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ state](<#/doc/locale/wstring_convert/state>) | retorna o estado de conversão atual   
(função membro pública de `std::wstring_convert<Codecvt,Elem,Wide_alloc,Byte_alloc>`)  
[ mbsinit](<#/doc/string/multibyte/mbsinit>) | verifica se o objeto [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>) representa o estado de mudança inicial   
(função)