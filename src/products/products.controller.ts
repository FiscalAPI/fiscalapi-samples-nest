/**
 * ┌───────────────────────────────────────────────────────────────────────────────┐
 * │                          IMPORTANTE - AVISO                                   │
 * │                                                                               │
 * │ Este controlador ha sido creado con fines exclusivamente demostrativos.       │
 * │                                                                               │
 * │ La mayoría de los datos están hardcodeados directamente en las acciones       │
 * │ del controlador para facilitar las pruebas inmediatas sin necesidad de        │
 * │ configurar cuerpos de peticiones. Esto permite probar la funcionalidad        │
 * │ simplemente haciendo clic en el botón "Probar" de Swagger.                    │
 * │                                                                               │
 * │ En esta aplicación de ejemplo solo se han creado dos controladores:           │
 * │ el de productos y el de factura, para demostrar el funcionamiento             │
 * │ básico de la API. Si desea ver ejemplos de todos los recursos                 │
 * │ disponibles en la API, visite los ejemplos completos de Node.js en:           │
 * │ https://github.com/FiscalAPI/fiscalapi-node/blob/main/examples/all-samples.ts │
 * │                                                                               │
 * │ Este código NO representa una arquitectura limpia ni sigue las mejores        │
 * │ prácticas para aplicaciones en producción. Aunque el SDK de FiscalAPI         │
 * │ implementa las mejores prácticas internamente, esta aplicación de             │
 * │ ejemplo está diseñada priorizando la simplicidad y facilidad de prueba.       │
 * │                                                                               │
 * │ En un entorno de producción, se recomienda utilizar una arquitectura          │
 * │ apropiada con separación de responsabilidades, validación adecuada,           │
 * │ manejo de errores, autenticación, autorización, etc.                          │
 * └───────────────────────────────────────────────────────────────────────────────┘
 */


import { Controller, Get, Post, Param, Delete, BadRequestException, HttpCode, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FiscalapiClient, Product } from 'fiscalapi';
import { createFiscalApiClient } from '../services/fiscalapi.service.factory';


@ApiTags('productos')
@Controller('productos')
export class ProductsController {
  private readonly fiscalApi: FiscalapiClient;

  constructor() {
    this.fiscalApi = createFiscalApiClient();
  }

    @Get()
    @ApiOperation({ summary: 'Listar productos' })
    @ApiResponse({ status: 200, description: 'Lista de productos obtenida correctamente' })
    @ApiResponse({ status: 400, description: 'Error al obtener lista de productos' })
    async getList() {
        try {
        const apiResponse = await this.fiscalApi.products.getList(1, 10);
        
        if (apiResponse.succeeded) {
            return apiResponse;
        } else {
            throw new BadRequestException(apiResponse);
        }
        } catch (error) {
        throw new BadRequestException(error.message);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener producto por ID' })
    @ApiParam({ name: 'id', description: 'ID del producto', type: 'string' })
    @ApiResponse({ status: 200, description: 'Producto obtenido correctamente' })
    @ApiResponse({ status: 400, description: 'Error al obtener el producto' })
    async getById(@Param('id') id: string) {
        try {
        const apiResponse = await this.fiscalApi.products.getById(id, true);
        
        if (apiResponse.succeeded) {
            return apiResponse;
        } else {
            throw new BadRequestException(apiResponse);
        }
        } catch (error) {
        throw new BadRequestException(error.message);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiResponse({ status: 200, description: 'Producto creado correctamente' })
    @ApiResponse({ status: 400, description: 'Error al crear el producto' })
    async create() {
        try {
        // Datos hardcodeados del ejemplo
        const modelRequest: Product = {
            description: 'Libro de nestJS',
            unitPrice: 200,
        };
        
        const apiResponse = await this.fiscalApi.products.create(modelRequest);
        
        if (apiResponse.succeeded) {
            return apiResponse;
        } else {
            throw new BadRequestException(apiResponse);
        }
        } catch (error) {
        throw new BadRequestException(error.message);
        }
    }

    @Put()
    @ApiOperation({ summary: 'Actualizar un producto existente' })
    @ApiResponse({ status: 200, description: 'Producto actualizado correctamente' })
    @ApiResponse({ status: 400, description: 'Error al actualizar el producto' })
    async update() {
        try {
        // Datos hardcodeados del ejemplo
        const modelRequest: Product = {
            id: '2501d498-e39d-4ca4-a1a2-e70896350d43',
            description: 'Libro de nestJS actualizado',
            unitPrice: 250,
            satUnitMeasurementId: 'D63',
            satTaxObjectId: '01',
            satProductCodeId: '14111804',
            productTaxes: [
            {
                rate: 0.16, // 16%
                taxId: '002', // IVA
                taxFlagId: 'T', // T=Trasladado | R=Retenido
                taxTypeId: 'Tasa', // Tasa | Cuota | Exento
            },
            {
                rate: 0.08, // 8%
                taxId: '003', // ISR    
                taxFlagId: 'T', // T=Trasladado | R=Retenido
                taxTypeId: 'Tasa', // Tasa | Cuota | Exento 
            }
            ]
        };
        
        const apiResponse = await this.fiscalApi.products.update(modelRequest);
        
        if (apiResponse.succeeded) {
            return apiResponse;
        } else {
            throw new BadRequestException(apiResponse);
        }
        } catch (error) {
        throw new BadRequestException(error.message);
        }
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Eliminar un producto' })
    @ApiParam({ name: 'id', description: 'ID del producto', type: 'string' })
    @ApiResponse({ status: 200, description: 'Producto eliminado correctamente' })
    @ApiResponse({ status: 400, description: 'Error al eliminar el producto' })
    async delete(@Param('id') id: string) {
        try {
        const apiResponse = await this.fiscalApi.products.delete(id);
        
        if (apiResponse.succeeded) {
            return apiResponse;
        } else {
            throw new BadRequestException(apiResponse);
        }
        } catch (error) {
        throw new BadRequestException(error.message);
        }
    }
}