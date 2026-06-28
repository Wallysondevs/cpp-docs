# Requisitos nomeados C++: Callable

Um tipo **Callable** é um tipo para o qual as operações [`_INVOKE_`](<#/doc/utility/functional>) e [`_INVOKE <R>_`](<#/doc/utility/functional>) (usadas por, por exemplo, [std::function](<#/doc/utility/functional/function>), [std::bind](<#/doc/utility/functional/bind>), e [std::thread::thread](<#/doc/thread/thread/thread>)) são aplicáveis.

`_INVOKE_` pode ser realizada explicitamente usando a função de biblioteca [std::invoke](<#/doc/utility/functional/invoke>). | (desde C++17)
---|---
`_INVOKE <R>_` pode ser realizada explicitamente usando a função de biblioteca [`std::invoke_r`](<#/doc/utility/functional/invoke>). | (desde C++23)

### Requisitos

O tipo `T` satisfaz Callable se

Dado

*   `f`, um objeto do tipo `T`,
*   `ArgTypes`, uma lista adequada de tipos de argumento,
*   `R`, um tipo de retorno adequado.

As seguintes expressões devem ser válidas:

Expressão | Requisitos
---|---
[`_INVOKE <R>_`](<#/doc/utility/functional>)(f, [std::declval](<#/doc/utility/declval>)&lt;ArgTypes&gt;()...) | A expressão é bem-formada em contexto não avaliado.

### Notas

[Ponteiros para membros de dados](<#/doc/language/pointer>) são Callable, mesmo que nenhuma chamada de função ocorra.

### Biblioteca padrão

Além disso, as seguintes facilidades da biblioteca padrão aceitam qualquer tipo Callable (não apenas [FunctionObject](<#/doc/named_req/FunctionObject>)):

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto callable copy constructible
---|---
(modelo de classe) |
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper move-only de qualquer objeto callable que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe) |
[ copyable_function](<#/doc/utility/functional/copyable_function>)(C++26) | wrapper copiável de qualquer objeto callable copy constructible que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe) |
[ function_ref](<#/doc/utility/functional/function_ref>)(C++26) | wrapper não proprietário de qualquer objeto callable
(modelo de classe) |
[ bind](<#/doc/utility/functional/bind>)(C++11) | vincula um ou mais argumentos a um objeto de função
(modelo de função) |
[ bind_frontbind_back](<#/doc/utility/functional/bind_front>)(C++20)(C++23) | vincula um número variável de argumentos, em ordem, a um objeto de função
(modelo de função) |
[ reference_wrapper](<#/doc/utility/functional/reference_wrapper>)(C++11) | wrapper de referência [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>)
(modelo de classe) |
[ result_ofinvoke_result](<#/doc/types/result_of>)(C++11)(removido em C++20)(C++17) | deduz o tipo de resultado de invocar um objeto callable com um conjunto de argumentos
(modelo de classe) |
[ thread](<#/doc/thread/thread>)(C++11) | gerencia uma thread separada
(classe) |
[ jthread](<#/doc/thread/jthread>)(C++20) | [std::thread](<#/doc/thread/thread>) com suporte para auto-joining e cancelamento
(classe) |
[ call_once](<#/doc/thread/call_once>)(C++11) | invoca uma função apenas uma vez, mesmo se chamada de múltiplas threads
(modelo de função) |
[ async](<#/doc/thread/async>)(C++11) | executa uma função assincronamente (potencialmente em uma nova thread) e retorna um [std::future](<#/doc/thread/future>) que conterá o resultado
(modelo de função) |
[ packaged_task](<#/doc/thread/packaged_task>)(C++11) | empacota uma função para armazenar seu valor de retorno para recuperação assíncrona
(modelo de classe) |

### Veja também

[ is_invocableis_invocable_ris_nothrow_invocableis_nothrow_invocable_r](<#/doc/types/is_invocable>)(C++17) | verifica se um tipo pode ser invocado (como se por [std::invoke](<#/doc/utility/functional/invoke>)) com os tipos de argumento fornecidos
---|---
(modelo de classe) |
[ invocableregular_invocable](<#/doc/concepts/invocable>)(C++20) | especifica que um tipo callable pode ser invocado com um dado conjunto de tipos de argumento
(conceito) |
[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) | invoca qualquer objeto **Callable** com os argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)
(modelo de função) |
*[_(as is)_]: A::pointer