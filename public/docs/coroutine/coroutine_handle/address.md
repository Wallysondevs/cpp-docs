# std::coroutine_handle&lt;Promise&gt;::address

```cpp
constexpr void* address() const noexcept;  // (desde C++20)
```

  
Retorna o endereço subjacente do `coroutine_handle`. O valor de retorno é não-nulo se e somente se o valor atual do `coroutine_handle` for obtido de um objeto promise de uma coroutine. 

### Parâmetros

(nenhum) 

### Valor de retorno

O endereço subjacente. 

### Observações

O valor de retorno é não-nulo para a especialização [std::noop_coroutine_handle](<#/doc/coroutine/coroutine_handle>), porque um `std::noop_coroutine_handle` não pode ser criado sem se referir a uma coroutine no-op. 

### Veja também

[ from_address](<#/doc/coroutine/coroutine_handle/from_address>)[static] |  importa uma coroutine de um ponteiro   
(função membro estática pública)  