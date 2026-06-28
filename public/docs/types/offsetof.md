# offsetof

Definido no cabeçalho `[<cstddef>](<#/doc/header/cstddef>)`

```c
#define offsetof(type, member) /* implementation-defined */
```

A macro **offsetof** expande para uma expressão constante integral do tipo [std::size_t](<#/doc/types/size_t>), cujo valor é o deslocamento, em bytes, do início de um objeto do tipo especificado para seu subobjeto especificado, incluindo [padding bits](<#/doc/language/objects>) se houver.

Dado um objeto `o` do tipo `type` e duração de armazenamento estática, `o.member` deve ser uma expressão constante lvalue que se refere a um subobjeto de `o`. Caso contrário, o comportamento é indefinido. Particularmente, se `member` for um [membro de dados estático](<#/doc/language/static>), um [bit-field](<#/doc/language/bit_field>), ou uma [função membro](<#/doc/language/member_functions>), o comportamento é indefinido.

Se `type` não for um [PODType](<#/doc/named_req/PODType>)(até C++11) tipo [standard-layout](<#/doc/language/data_members>)(desde C++11), o resultado de `offsetof` é indefinido(até C++17) o uso da macro `offsetof` é condicionalmente suportado(desde C++17).

A expressão `offsetof(type, member)` nunca é [dependente de tipo](<#/doc/language/dependent_name>) e é dependente de valor se e somente se `type` for dependente.

### Exceções

`offsetof` não lança exceções.

```cpp
A expressão `noexcept(offsetof(type, member))` sempre avalia para `true`.  // (desde C++11)
```

### Notas

O deslocamento do primeiro membro de um tipo standard-layout é sempre zero ([otimização de base vazia](<#/doc/language/ebo>) é obrigatória). | (desde C++11)

`offsetof` não pode ser implementado em C++ padrão e requer suporte do compilador: [GCC](<https://github.com/gcc-mirror/gcc/blob/68ec60c4a377b532ec2d265ea542107c36b1d15c/gcc/ginclude/stddef.h#L406>), [LLVM](<https://github.com/llvm-mirror/clang/blob/release_70/lib/Headers/stddef.h#L120>).

`member` não está restrito a um membro direto. Ele pode denotar um subobjeto de um determinado membro, como um elemento de um membro array. Isso é especificado por [C DR 496](<https://open-std.org/JTC1/SC22/WG14/www/docs/n2396.htm#dr_496>).

É especificado em C23 que definir um novo tipo contendo uma vírgula não-parentesizada em `offsetof` é comportamento indefinido, e tal uso geralmente não é suportado por implementações em modos C++: `offsetof(struct Foo { int a, b; }, a)` é rejeitado por todas as implementações conhecidas.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
     
    struct S
    {
        char   m0;
        double m1;
        short  m2;
        char   m3;
    //  private: int z; // warning: 'S' is a non-standard-layout type
    };
     
    int main()
    {
        std::cout
            << "offset of char   m0 = " << offsetof(S, m0) << '\n'
            << "offset of double m1 = " << offsetof(S, m1) << '\n'
            << "offset of short  m2 = " << offsetof(S, m2) << '\n'
            << "offset of char   m3 = " << offsetof(S, m3) << '\n';
    }
```

Saída possível:
```
    offset of char   m0 = 0
    offset of double m1 = 8
    offset of short  m2 = 16
    offset of char   m3 = 18
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 273](<https://cplusplus.github.io/CWG/issues/273.html>) | C++98 | `offsetof` pode não funcionar se o `operator&` unário for sobrecarregado | requerido para funcionar corretamente mesmo se `operator&` for sobrecarregado
[LWG 306](<https://cplusplus.github.io/LWG/issue306>) | C++98 | o comportamento não era especificado quando `type` não é um [PODType](<#/doc/named_req/PODType>) | o resultado é indefinido neste caso
[LWG 449](<https://cplusplus.github.io/LWG/issue449>) | C++98 | outros requisitos de `offsetof` foram removidos pela resolução do [LWG issue 306](<https://cplusplus.github.io/LWG/issue306>) | adicionados de volta

### Veja também

```cpp
 size_t | tipo inteiro sem sinal retornado pelo operador `sizeof`
(typedef)
 is_standard_layout(C++11) | verifica se um tipo é um tipo standard-layout
(class template)
Documentação C para offsetof
```