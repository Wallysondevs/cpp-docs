# std::out_ptr

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class Pointer = void, class Smart, class... Args >
auto out_ptr( Smart& s, Args&&... args );
```

  
Retorna um [`std::out_ptr_t`](<#/doc/memory/out_ptr_t>) com argumentos de template deduzidos que captura argumentos para redefinição por referência.

O programa é malformado se a construção do valor de retorno (veja abaixo) for malformada.

### Parâmetros

s  |  \-  |  o objeto (tipicamente um ponteiro inteligente) a ser adaptado   
---|---|---
args...  |  \-  |  os argumentos para redefinição a serem capturados   
  
### Valor de retorno

[std::out_ptr_t](<#/doc/memory/out_ptr_t>)<Smart, P, Args&&>(s, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...), onde `P` é 

  * `Pointer`, se `Pointer` não for o mesmo que void. Caso contrário, 
  * `Smart::pointer`, se for válido e denotar um tipo. Caso contrário, 
  * `Smart::element_type*`, se `Smart::element_type` for válido e denotar um tipo. Caso contrário, 
  * [std::pointer_traits](<#/doc/memory/pointer_traits>)&lt;Smart&gt;::element_type*. 

### Notas

Usuários podem especificar o argumento de template para o parâmetro de template `Pointer`, a fim de interoperar com funções externas que aceitam um `Pointer*`.

Como todos os argumentos para redefinição são capturados por referência, o `out_ptr_t` retornado deve ser um objeto temporário destruído no final da expressão completa que contém a chamada para a função externa, a fim de evitar referências pendentes.

Macro de teste de recurso  | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_out_ptr`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | `std::out_ptr`, std::inout_ptr  
[`202311L`](<#/>) | (C++26) | `std::out_ptr` e `std::inout_ptr` freestanding  
  
### Exemplo

Use `std::out_ptr` para adaptar um ponteiro inteligente para `sqlite3_open`, que espera um `sqlite3` como um parâmetro de saída.

Execute este código
```
    #include <memory>
    #include <sqlite3.h>
     
    int main()
    {
        auto close_db =  { sqlite3_close(db); };
     
        {
            // abre um banco de dados em memória e gerencia sua vida útil com std::unique_ptr
            std::unique_ptr<sqlite3, decltype(close_db)> up;
            sqlite3_open(":memory:", std::out_ptr(up));
     
            sqlite3* db = up.get();
            // faça algo com db ...
        }
        {
            // o mesmo que acima, mas use um std::shared_ptr
            std::shared_ptr<sqlite3> sp;
            sqlite3_open(":memory:", std::out_ptr(sp, close_db));
     
            sqlite3* db = sp.get();
            // faça algo com db ...
        }
    }
```

### Veja também

[ inout_ptr](<#/doc/memory/inout_ptr_t/inout_ptr>)(C++23) |  cria um `inout_ptr_t` com um ponteiro inteligente associado e argumentos de redefinição   
(modelo de função)  
[ make_uniquemake_unique_for_overwrite](<#/doc/memory/unique_ptr/make_unique>)(C++14)(C++20) |  cria um unique pointer que gerencia um novo objeto   
(modelo de função)  
[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(C++20) |  cria um shared pointer que gerencia um novo objeto   
(modelo de função)