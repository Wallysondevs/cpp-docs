# std::inout_ptr

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class Pointer = void, class Smart, class... Args >
auto inout_ptr( Smart& s, Args&&... args );
```

Retorna um `inout_ptr_t` com argumentos de template deduzidos que captura argumentos para redefinição por referência.

O programa é malformado se a construção do valor de retorno (veja abaixo) for malformada.

### Parâmetros

- **s** — o objeto (tipicamente um smart pointer) a ser adaptado
- **args...** — os argumentos para redefinição a serem capturados

### Valor de retorno

[std::inout_ptr_t](<#/doc/memory/inout_ptr_t>)<Smart, P, Args&&>(s, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...), onde `P` é

*   `Pointer`, se `Pointer` não for o mesmo que void, caso contrário,
*   Smart::pointer, se for válido e denotar um tipo, caso contrário,
*   Smart::element_type*, se Smart::element_type for válido e denotar um tipo, caso contrário,
*   [std::pointer_traits](<#/doc/memory/pointer_traits>)&lt;Smart&gt;::element_type*.

### Observações

Usuários podem especificar o argumento de template para o parâmetro de template `Pointer`, a fim de interoperar com funções externas que recebem um Pointer*.

Como todos os argumentos para redefinição são capturados por referência, o `inout_ptr_t` retornado deve ser um objeto temporário destruído no final da expressão completa que contém a chamada para a função externa, a fim de evitar referências pendentes.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_out_ptr`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | `std::out_ptr`, std::inout_ptr
[`202311L`](<#/>) | (C++26) | `std::out_ptr` e std::inout_ptr autônomos

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ out_ptr](<#/doc/memory/out_ptr_t/out_ptr>)(C++23) | cria um `out_ptr_t` com um smart pointer associado e argumentos de redefinição
(modelo de função)
[ make_uniquemake_unique_for_overwrite](<#/doc/memory/unique_ptr/make_unique>)(C++14)(C++20) | cria um unique pointer que gerencia um novo objeto
(modelo de função)
[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto
(modelo de função)