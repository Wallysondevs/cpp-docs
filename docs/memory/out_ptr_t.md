# std::out_ptr_t

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class Smart, class Pointer, class... Args >
class out_ptr_t;
```

`out_ptr_t` é usado para adaptar tipos como smart pointers para funções externas que produzem seus resultados via um parâmetro `Pointer*` (geralmente `T` para algum tipo de objeto `T`) ou `void`.

`out_ptr_t` captura argumentos adicionais na construção, fornece armazenamento para o resultado no qual tal função externa mencionada escreve, e finalmente redefine o objeto `Smart` adaptado com o resultado e os argumentos capturados quando é destruído.

`out_ptr_t` se comporta como se contivesse os seguintes membros de dados não estáticos:

  * uma referência `Smart&`, que é vinculada ao objeto adaptado na construção,
  * para cada `T` em `Args...`, um membro do tipo `T`, que é um argumento capturado na construção e usado para redefinição durante a destruição, e
  * um subobjeto membro adequado para armazenar um `Pointer` dentro dele e fornecer um objeto `void*`, onde o objeto `Pointer` ou `void*` é geralmente exposto a uma função externa para reinicialização.

Usuários podem controlar se cada argumento para redefinição é capturado por cópia ou por referência, especificando um tipo de objeto ou um tipo de referência em `Args...` respectivamente.

### Parâmetros de template

- **Smart** — o tipo do objeto (tipicamente um smart pointer) a ser adaptado
- **Pointer** — tipo do objeto (tipicamente um ponteiro bruto) no qual uma função externa escreve seu resultado
- **Args...** — tipo dos argumentos capturados usados para redefinir o objeto adaptado

#### Requisitos de tipo
-`Pointer` deve atender aos requisitos de [NullablePointer](<#/doc/named_req/NullablePointer>).
-O programa é malformado se `Smart` for uma especialização de [std::shared_ptr](<#/doc/memory/shared_ptr>) e `sizeof...(Args) == 0`.

### Especializações

Ao contrário da maioria dos templates de classe na standard library, [especializações definidas pelo programa](<#/doc/language/type-id>) de `out_ptr_t` que dependem de pelo menos um [tipo definido pelo programa](<#/doc/language/type-id>) não precisam atender aos requisitos do template primário.

Esta licença permite que uma especialização definida pelo programa exponha o ponteiro bruto armazenado dentro de um smart pointer não padrão para funções externas.

### Funções membro

```cpp
 (construtor)(C++23) | constrói um `out_ptr_t`
(função membro pública)
operator=deleted | `out_ptr_t` não é atribuível
(função membro pública)
 (destrutor)(C++23) | redefine o smart pointer adaptado
(função membro pública)
 operator Pointer*operator void**(C++23) | converte o `out_ptr_t` para o endereço do armazenamento para saída
(função membro pública)
```

### Funções não membro

[ out_ptr](<#/doc/memory/out_ptr_t/out_ptr>)(C++23) | cria um `out_ptr_t` com um smart pointer associado e argumentos de redefinição
---|---
(template de função) |

### Notas

`out_ptr_t` espera que as funções externas não usem o valor do `Pointer` apontado, e apenas o reinicializem. O valor do smart pointer antes da adaptação não é usado.

O uso típico de `out_ptr_t` é a criação de seus objetos temporários por `std::out_ptr`, que redefine o smart pointer adaptado imediatamente. Por exemplo, dada uma função setter e um smart pointer do tipo apropriado declarado com `int foreign_setter(T**);` e `[std::unique_ptr](<#/doc/memory/unique_ptr>)<T, D> up;` respectivamente,
```cpp
    int foreign_setter(T**);
    std::unique_ptr<T, D> up;
    
    if (int ec = foreign_setter(std::out_ptr(up)))
        return ec;
```

é aproximadamente equivalente a
```cpp
    int foreign_setter(T**);
    std::unique_ptr<T, D> up;
    T* raw_p{};
    
    int ec = foreign_setter(&raw_p);
    up.reset(raw_p);
    if (ec != 0)
        return ec;
```

Não é recomendado criar um objeto `out_ptr_t` com uma [duração de armazenamento](<#/doc/language/storage_duration>) diferente da duração de armazenamento automática, porque tal código provavelmente produzirá referências pendentes e resultará em comportamento indefinido na destruição.

`out_ptr_t` proíbe o uso que redefiniria um [std::shared_ptr](<#/doc/memory/shared_ptr>) sem especificar um deleter, porque isso chamaria [std::shared_ptr::reset](<#/doc/memory/shared_ptr/reset>) e substituiria um deleter personalizado posteriormente.

Argumentos capturados são tipicamente empacotados em um [std::tuple](<#/doc/utility/tuple>)`<Args...>`. As implementações podem usar mecanismos diferentes para fornecer o objeto `Pointer` ou `void*` que precisam conter.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_out_ptr`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | `std::out_ptr`, `std::inout_ptr`
[`202311L`](<#/>) | (C++26) | `std::out_ptr` e `std::inout_ptr` freestanding

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ inout_ptr_t](<#/doc/memory/inout_ptr_t>)(C++23) | interopera com setters de ponteiro externos, obtém o valor inicial do ponteiro de um smart pointer e o redefine na destruição
---|---
(template de classe) |
[ unique_ptr](<#/doc/memory/unique_ptr>)(C++11) | smart pointer com semântica de propriedade única de objeto
(template de classe) |
[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | smart pointer com semântica de propriedade compartilhada de objeto
(template de classe) |