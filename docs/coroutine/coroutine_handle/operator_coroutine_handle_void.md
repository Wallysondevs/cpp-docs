# std::coroutine_handle&lt;Promise&gt;::operator coroutine_handle&lt;&gt;

```cpp
constexpr operator coroutine_handle<>() const noexcept;  // (desde C++20)
```

  
Esta função de conversão converte um valor [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)&lt;Promise&gt; para um [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<> que mantém o mesmo endereço subjacente. Ela efetivamente apaga o tipo da promise. 

### Parâmetros

(nenhum) 

### Valor de retorno

[std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<>::from_address(address())

### Veja também

[ operator==operator<=>](<#/doc/coroutine/coroutine_handle/operator_cmp>)(C++20) |  compara dois objetos `coroutine_handle`   
(função)  