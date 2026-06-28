# std::experimental::make_unique_resource_checked

Definido no cabeçalho `[<experimental/scope>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/scope&action=edit&redlink=1> "cpp/header/experimental/scope \(page does not exist\)")`

```c
template< class R, class D, class S = std::decay_t<R> >
std::experimental::unique_resource<std::decay_t<R>, std::decay_t<D>>
make_unique_resource_checked( R&& r, const S& invalid, D&& d )
noexcept(/*see below*/);
```

Cria um `unique_resource`, inicializa seu handle de recurso armazenado com `[std::forward](<#/doc/utility/forward>)<R>(r)` e seu deleter com `[std::forward](<#/doc/utility/forward>)<D>(d)`. O `unique_resource` criado possui o recurso se e somente se `bool(r == invalid)` for falso.

O programa é malformado se a expressão `r == invalid` não puder ser [convertida contextualmente para bool](<#/doc/language/implicit_cast>), e o comportamento é indefinido se a conversão resultar em comportamento indefinido ou lançar uma exceção.

### Parâmetros

- **r** — um handle de recurso
- **d** — um deleter para usar para descartar o recurso
- **invalid** — um valor indicando que o handle de recurso é inválido

### Valor de retorno

Um `unique_resource` descrito acima.

### Exceções

Qualquer exceção lançada na inicialização do handle de recurso armazenado e do deleter.

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(

[std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;R&gt;, R> &&
[std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;D&gt;, D>

)

### Notas

`make_unique_resource_checked` existe para evitar chamar uma função deleter com um argumento inválido.

O handle de recurso `r` é copiado ou movido para o valor de retorno, e o `unique_resource` criado sempre mantém um handle de recurso subjacente com tipo de objeto.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <experimental/scope>
    
    int main()
    {
        // avoid calling fclose when fopen fails
        auto file = std::experimental::make_unique_resource_checked(
            std::fopen("potentially_nonexistent_file.txt", "r"),
            nullptr,
             *fptr) { std::fclose(fptr); }
        );
        if (file.get())
            std::puts("The file exists.");
        else
            std::puts("The file does not exist.");
    }
```

Saída possível:
```
    The file does not exist.
```

### Veja também
---
* [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
* [Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.