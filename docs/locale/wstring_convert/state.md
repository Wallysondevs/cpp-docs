# std::wstring_convert&lt;Codecvt,Elem,Wide_alloc,Byte_alloc&gt;::state

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
state_type state() const;
```

Retorna o valor atual do estado de conversão, que é armazenado neste objeto `wstring_convert`. O estado de conversão pode ser explicitamente definido no construtor e é atualizado por todas as operações de conversão.

### Valor de retorno

`_[cvtstate](<#/doc/locale/wstring_convert>)_`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ to_bytes](<#/doc/locale/wstring_convert/to_bytes>) | converte uma wide string em uma byte string
(função membro pública)
[ from_bytes](<#/doc/locale/wstring_convert/from_bytes>) | converte uma byte string em uma wide string
(função membro pública)
[ mbsinit](<#/doc/string/multibyte/mbsinit>) | verifica se o objeto `[std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)` representa o estado de mudança inicial
(função)