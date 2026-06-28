# std::inout_ptr_t

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class Smart, class Pointer, class... Args >
class inout_ptr_t;
```

`inout_ptr_t` é usado para adaptar tipos como smart pointers para funções externas que redefinem a propriedade através de um parâmetro `Pointer*` (geralmente `T` para algum tipo de objeto `T`) ou void**.

`inout_ptr_t` captura argumentos adicionais na construção, fornece um armazenamento para o resultado que tal função externa mencionada acessa, libera a propriedade mantida pelo objeto `Smart` adaptado e, finalmente, redefine o objeto `Smart` adaptado com o resultado e os argumentos capturados quando é destruído.

`inout_ptr_t` se comporta como se contivesse os seguintes membros de dados não estáticos:

*   uma referência `Smart&`, que é vinculada ao objeto adaptado na construção,
*   para cada `T` em `Args...`, um membro do tipo `T`, que é um argumento capturado na construção e usado para redefinição durante a destruição, e
*   um subobjeto membro adequado para armazenar um `Pointer` dentro dele e fornecer um objeto void*, onde o objeto `Pointer` ou void* é geralmente exposto a uma função externa para redefinição de propriedade.

Se `Smart` não for um tipo de ponteiro, release() é chamado no máximo uma vez no objeto adaptado. As implementações podem chamar release() dentro do construtor, ou antes de redefinir dentro do destrutor se o valor de `Pointer` não for nulo.

Os usuários podem controlar se cada argumento para redefinição é capturado por cópia ou por referência, especificando um tipo de objeto ou um tipo de referência em `Args...` respectivamente.

### Parâmetros de template

- **Smart** — o tipo do objeto (tipicamente um smart pointer) a ser adaptado
- **Pointer** — tipo do objeto (tipicamente um ponteiro bruto) ao qual uma função externa acessa para redefinição de propriedade
- **Args...** — tipo de argumentos capturados usados para redefinir o objeto adaptado
Requisitos de tipo
-`Pointer` deve atender aos requisitos de [NullablePointer](<#/doc/named_req/NullablePointer>).
-O programa é malformado se `Smart` for uma especialização de [std::shared_ptr](<#/doc/memory/shared_ptr>).

### Especializações

Ao contrário da maioria dos class templates na standard library, [especializações definidas pelo programa](<#/doc/language/type-id>) de `inout_ptr_t` que dependem de pelo menos um [tipo definido pelo programa](<#/doc/language/type-id>) não precisam atender aos requisitos do template primário.

Esta licença permite que uma especialização definida pelo programa exponha o ponteiro bruto armazenado dentro de um smart pointer não padrão para funções externas.

### Funções membro

[ (construtor)](<#/doc/memory/inout_ptr_t/inout_ptr_t>)(C++23) | constrói um `inout_ptr_t`
(função membro pública)
operator=[deleted](C++23) | `inout_ptr_t` não é atribuível
(função membro pública)
[ (destrutor)](<#/doc/memory/inout_ptr_t/~inout_ptr_t>)(C++23) | redefine o smart pointer adaptado após liberar sua propriedade
(função membro pública)
[ operator Pointer*operator void**](<#/doc/memory/inout_ptr_t/operator_ptr>)(C++23) | converte o `inout_ptr_t` para o endereço do armazenamento para saída
(função membro pública)

### Funções não membro

[ inout_ptr](<#/doc/memory/inout_ptr_t/inout_ptr>)(C++23) | cria um `inout_ptr_t` com um smart pointer associado e argumentos de redefinição
(template de função)

### Notas

`inout_ptr_t` espera que as funções externas liberem a propriedade representada pelo valor do `Pointer` apontado e, em seguida, o reinicializem. Como tal operação requer propriedade única, o uso com [std::shared_ptr](<#/doc/memory/shared_ptr>) é proibido.

O uso típico de `inout_ptr_t` é criar seus objetos temporários por std::inout_ptr, que redefine o smart pointer adaptado imediatamente. Por exemplo, dada uma função setter e um smart pointer do tipo apropriado declarado com int foreign_resetter(T**); e [std::unique_ptr](<#/doc/memory/unique_ptr>)<T, D> up; respectivamente,
```cpp
    if (int ec = foreign_resetter(std::inout_ptr(up)))
        return ec;
```

é aproximadamente equivalente a
```cpp
    T *raw_p = up.get();
    up.release();
    int ec = foreign_resetter(&raw_p);
    up.reset(raw_p);
    if (ec != 0)
        return ec;
```

Não é recomendado criar um objeto `inout_ptr_t` com uma [duração de armazenamento](<#/doc/language/storage_duration>) diferente da duração de armazenamento automática, porque tal código provavelmente produzirá referências pendentes e resultará em comportamento indefinido na destruição.

Argumentos capturados são tipicamente empacotados em um [std::tuple](<#/doc/utility/tuple>)<Args...>. As implementações podem usar mecanismos diferentes para fornecer o objeto `Pointer` ou void* que precisam manter.

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_out_ptr`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | `std::out_ptr`, std::inout_ptr
[`202311L`](<#/>) | (C++26) | `std::out_ptr` e std::inout_ptr freestanding

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ out_ptr_t](<#/doc/memory/out_ptr_t>)(C++23) | interopera com setters de ponteiro externos e redefine um smart pointer na destruição
(template de classe)
[ unique_ptr](<#/doc/memory/unique_ptr>)(C++11) | smart pointer com semântica de propriedade única de objeto
(template de classe)
[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | smart pointer com semântica de propriedade compartilhada de objeto
(template de classe)