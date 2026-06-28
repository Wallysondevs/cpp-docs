# guias de dedução para std::packaged_task

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
template< class R, class... Args >
packaged_task( R(*)(Args...) ) -> packaged_task<R(Args...)>;
template< class F >
packaged_task( F ) -> packaged_task</*see below*/>;
template< class F >
packaged_task( F ) -> packaged_task</*see below*/>;
template< class F >
packaged_task( F ) -> packaged_task</*see below*/>;
```

1) Este [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::packaged_task](<#/doc/thread/packaged_task>) para permitir a dedução a partir de funções.

2) Esta sobrecarga participa da resolução de sobrecarga somente se &F::operator() for bem-formado quando tratado como um operando não avaliado e decltype(&F::operator()) for da forma R(G::*)(A...) (opcionalmente cv-qualified, opcionalmente noexcept, opcionalmente lvalue reference qualified). O tipo deduzido é [std::packaged_task](<#/doc/thread/packaged_task>)<R(A...)>.

3) Esta sobrecarga participa da resolução de sobrecarga somente se &F::operator() for bem-formado quando tratado como um operando não avaliado e F::operator() for uma [função com parâmetro de objeto explícito](<#/doc/language/member_functions>) cujo tipo é da forma R(G, A...) ou R(G, A...) noexcept. O tipo deduzido é [std::packaged_task](<#/doc/thread/packaged_task>)<R(A...)>.

4) Esta sobrecarga participa da resolução de sobrecarga somente se &F::operator() for bem-formado quando tratado como um operando não avaliado e F::operator() for uma [função membro estática](<#/doc/language/static>) cujo tipo é da forma R(A...) ou R(A...) noexcept. O tipo deduzido é [std::packaged_task](<#/doc/thread/packaged_task>)<R(A...)>.

### Notas

Estes guias de dedução não permitem a dedução a partir de uma função com [parâmetro de reticências](<#/doc/language/variadic_arguments>), e o ... nos tipos é sempre tratado como uma [expansão de pack](<#/doc/language/parameter_pack>).

### Exemplo

Execute este código
```cpp
    #include <future>
    
    int func(double) { return 0; }
    
    int main()
    {
        std::packaged_task f{func}; // deduz packaged_task<int(double)>
    
        int i = 5;
        std::packaged_task g = & { return i; }; // => packaged_task<int(double)>
    }
```