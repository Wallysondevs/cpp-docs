# std::stop_callback_for_t

Definido no cabeçalho `[<stop_token>](<#/doc/header/stop_token>)`

```c
template< class T, class CallbackFn >
using stop_callback_for_t = T::template callback_type<CallbackFn>;
```

O alias template `stop_callback_for_t` é usado para obter o tipo de callback de parada do tipo `T`.

### Notas

Os `stop_callback_for_t` correspondentes para tipos de stop token padrão e qualquer `CallbackFn` válido são:

  * especialização de [std::stop_callback](<#/doc/thread/stop_callback>) para [std::stop_token](<#/doc/thread/stop_token>),
  * especialização de std::inplace_stop_callback para std::inplace_stop_token, e
  * tipo não especificado sem registro e desregistro de callback parável para std::never_stop_token.
